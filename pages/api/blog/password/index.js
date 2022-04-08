import blogFunctions from "../blogFunction";

const PasswordHandler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// 비밀번호 확인
			const result = await blogFunctions.passwordCheck(req.body);
			if (result) {
				return res.status(200).send({ result });
			}
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
};

export default PasswordHandler;
