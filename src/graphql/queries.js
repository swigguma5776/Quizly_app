const { UserType, QuizType, SubmissionType } = require('./types')
const { User, Quiz, Submission } = require('../models')
const { GraphQLString, GraphQLID, GraphQLList } = require('graphql')

const users = {
    type: new GraphQLList(UserType),
    description: 'Query a list of users',
    resolve(parent, args) {
        return User.find()
    }
}

/* 
* Get user by id
*/
const user = {
    type: UserType,
    description: 'Query a user by their ID',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

/* 
* Get a quiz based on a slug
*/
const quizBySlug = {
    type: QuizType,
    description: 'Query a quiz by its slug',
    args: {
        slug: { type: GraphQLString }
    },
    resolve(parent, args) {
        return Quiz.findOne({
            slug: args.slug
        })
    }
}

/* 
* Submission by id
*/
const submissionById = {
    type: SubmissionType,
    description: 'Query a submission by their ID',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return Submission.findById(args.id)
    }
}

module.exports = {
    users,
    user,
    quizBySlug,
    submissionById
}