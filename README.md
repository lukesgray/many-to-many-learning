# many-to-many-learning

Using: Javascript, EJS, Node, Express for Routing, Mongoose and MongoDB

A project to practice managing a many to many relationship between multiple teachers and multiple students
This project uses mongDB and mongoose schemas to design the data structure for a many to many relationship
The trick is to use object ids of the type of object model you wish to reference

In your schema, add an array that shares the same name as the object model you wish to reference
Create a "ref" and "type" key in your schema design and store "Schema.Types.ObjectId" and "desired related object" respectively
Now all objects you make with that schema will be capable of storing, in the array, object ids from other objects of that same model without needing to store all data
You can use .populate in your get requests to populate information beyond just the object ID
