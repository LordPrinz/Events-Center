export default handler = (req, res) => {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        res.status(201).json({ message: "Signed up!" });
    }
};