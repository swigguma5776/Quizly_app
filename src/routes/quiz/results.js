const axios = require('axios')

module.exports = async (req, res) => {
    const query = `
        query submissionById($id: ID!) { 
            submissionById( id: $id ) {
                id,
                quiz {
                    title
                },
                user {
                    id
                },
                score
            }
        }`

    let submission = {}

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query,
                variables: {
                    id: req.params.id
                } 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   

        submission = data.data.submissionById
        console.log(`this is submission: ${submission.quiz.title}`)
        console.log(req.verifiedUser.user._id)
        console.log(req.verifiedUser.user.username)
        console.log(submission.user.id)
        console.log(submission.user.username)
    

        if (submission.user.username !== req.verifiedUser.user.username) {
            console.log('they do not equal')
            res.redirect("/")
        }
    } catch(e) {
        console.log(e.response.data)
        /* res.redirect('/') */
    }   
    res.render('quiz-results', { submission })
}