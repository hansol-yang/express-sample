const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');

/**
 * 회원 가입
 *
 * 1. 주어진 username 으로 가입된 유저가 있는지 ?
 *  1.1 있다면 409 에러
 *  1.2 없다면 비밀번호 유효성 체크 ( 선택적 )
 * 2. 회원 가입 진행
 */
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user) {
            return res.status(409).json({
                msg: '이미 가입된 유저명입니다',
            });
        }

        // 비밀번호 유효성 체크 ( 선택적 )
        // if (!validPassword(password)) {
        //     return res.status(400).json({
        //         msg: '비밀번호 형식을 확인해주세요',
        //     });
        // }

        const newUser = await User.create({ username, password });
        res.json({
            success: true,
            user: newUser,
        });
    } catch (e) {
        console.log('에러 핸들링', e);
    }
};

/**
 * 로그인
 *
 * 1. 주어진 username 으로 가입된 유저가 있는지 ?
 *  1.1 없다면 403 에러
 *  1.2 있다면 비밀번호 확인
 *      1.2.1 비밀번호가 틀리다면 403 에러
 * 2. 토큰 발행
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const loginErrorObj = { msg: '로그인 정보를 확인해주세요' };

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json(loginErrorObj);
        }

        const passwordIsValid = await user.validPassword(password);
        if (!passwordIsValid) {
            return res.status(401).json(loginErrorObj);
        }

        const payload = { username: user.username, sub: user.id };
        jwt.sign(payload, 'S3Cr#tK3Y', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw err;
            }

            res.json({
                token,
            });
        });
    } catch (e) {
        console.log('에러 핸들링', e);
    }
};
