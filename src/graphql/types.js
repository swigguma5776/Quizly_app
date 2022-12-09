const { User, Question, Quiz, Submission } = require('../models')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        quizzes: {
            type: new GraphQLList(QuizType),
            resolve(parent,args) {
                return Quiz.find({ userId: parent.id })
            }
        },
        submissions: {
            type: new GraphQLList(SubmissionType),
            resolve(parent,args) {
                return Submission.find({ userId: parent.id })
            }
        }
    })
})

const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    description: 'Quiz type',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent,args) {
                return Question.find({ quizId: parent.id })
            }
        },
        submissions: {
            type: new GraphQLList(SubmissionType),
            resolve(parent,args) {
                return Submission.find({ quizId: parent.id })
            }
        },
        user: {
            type: UserType,
            resolve(parent,args) {
                return User.findById(parent.userId)
            }
        },
        avgScore: {
            type: GraphQLFloat,
            async resolve(parent,args) {
                const submissions = await Submission.find({ quizId: parent.id })

                let score = 0

                for (const submission of submissions) {
                    score += submission.score
                }

                return score / submissions.length
            }
        }
    })
})

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    description: 'Question type',
    fields: () => ({
        id: { type: GraphQLID },
        quizId: { type: GraphQLString },
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt }
    })
})

const QuestionInputType = new GraphQLInputObjectType({
    name: 'QuestionInput',
    description: 'Question input type',
    fields: () => ({
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt }
    })
})

const AnswerInputType = new GraphQLInputObjectType({
    name: 'AnswerInput',
    description: 'Answer input type',
    fields: () => ({
        questionId: { type: GraphQLString },
        answer: { type: GraphQLString }
    })
})

const SubmissionType = new GraphQLObjectType({
    name: 'Submission',
    description: 'Submission type',
    fields: () => ({
        id: { type: GraphQLID },
        quizId: { type: GraphQLString },
        userId: { type: GraphQLString },
        score: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent,args) {
                return User.findOne({ id: parent.userId })
            }
        },
        quiz: {
            type: QuizType,
            resolve(parent,args) {
                return Quiz.findOne({ id: parent.quizId })
            }
        }
    })
})



module.exports = {
    UserType,
    QuizType,
    QuestionType,
    SubmissionType,
    QuestionInputType,
    AnswerInputType
}