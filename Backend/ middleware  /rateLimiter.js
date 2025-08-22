import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(404).send({message: "Too many requests, please try again later",});
        }

        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}

export default rateLimiter