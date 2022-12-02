import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import db from "../database/db";


const bookType = new GraphQLObjectType({
    name :"book",
    fields: ()=>({
        id:{
            type:GraphQLString
        },
        title:{
            type:GraphQLString
        },
        genre:{
            type:GraphQLString
        },
        author:{
            type:authorType,
            resolve(parent, args){
                return db().select("*").from("books").where("id",parent.authorId).first();
            }
        }
    })
})

const authorType:GraphQLObjectType = new GraphQLObjectType({
    name :"Author",
    fields: ()=>({
        id:{
            type:GraphQLString
        },
        name:{
            type:GraphQLString
        },
        rating:{
            type:GraphQLInt
        },
        books:{
            type:new GraphQLList(bookType),
            resolve(parent,args){
                return db().select("*").from('authors').where('authorId', parent.authorId);
            }
        }
    })
})

const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:()=>({
        book:{
            type:bookType,
            args:{id: {type:GraphQLString}},
            resolve(parent, {id}){
                return db().select().from('books').where('id', id).first();
            }
        },
        author:{
            type:authorType,
            args:{id: {type:GraphQLString}},
            resolve(parent, {id}){
                return db().select().from('authors').where('id', id).first();
            }
        }
    })
})

export default new GraphQLSchema({
    query:rootQuery
})