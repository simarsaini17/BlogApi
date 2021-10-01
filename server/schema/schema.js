const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType } = graphql;
const { GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;
const Blog = require('../models/blog');

const BlogType = new GraphQLObjectType({
    name: "Blog",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLID },
        blog: {
            type: BlogType,
            resolve(parent, args) {
                Blog.findById(parent.id);
            }
        }
    }),

})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        blog: {
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Blog.findById(args.id);
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args) {
                return Blog.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBlog: {
            type: BlogType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parent, args) {
                let blog = new Blog({
                    title: args.title,
                    description: args.description
                });
                return blog.save();
            }
        },
        updateBlog: {
            type: BlogType,
            args: { id: { type: GraphQLID }, description: { type: GraphQLString } },
            resolve(parent, args) {
                return Blog.findOneAndUpdate(args.id, { $set: { description: args.description } }).exec();
            }
        },
        deleteBlog: {
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Blog.findByIdAndRemove(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})