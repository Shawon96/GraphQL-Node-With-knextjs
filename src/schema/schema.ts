import {GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";

const books = [    {
    title: 'My book',
    id: '1',
    genre: 'thriller',
    authorId: '2',
  },
  {
    title: 'History of the World',
    id: '2',
    genre: 'history',
    authorId: '2',
  },
  {
    title: 'The book of stories',
    id: '3',
    genre: 'fiction',
    authorId: '3',
  }]

 const authors = [ {
                        name: 'Jack Jones',
                        age: 55,
                        rating: 5,
                        id: '1',
                    },
                    {
                        name: 'Verna Frag',
                        age: 60,
                        rating: 5,
                        id: '2',
                    },
                    {
                        name: 'Ron Tamara',
                        age: 25,
                        rating: 5,
                        id: '3',
                    },
                    {
                        name: 'Ranji Imaan',
                        age: 35,
                        rating: 5,
                        id: '4',
                    }]

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
        }
    })
})

const authorType = new GraphQLObjectType({
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
                return books.filter((b)=>b.id == id)[0];
            }
        },
        author:{
            type:authorType,
            args:{id: {type:GraphQLString}},
            resolve(parent, {id}){
                return authors.filter((b)=>b.id == id)[0];
            }
        }
    })
})

export default new GraphQLSchema({
    query:rootQuery
})