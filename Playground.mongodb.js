//1. Open VS Code and connect to MONGODB.
//Screenshot of the created connection is shown in the document 



//2. Create a database "ProductOrder" and create collections "Product","Inventory","User", and "Order" in it.
use('ProductOrder');
db.createCollection('Product');
db.createCollection('Inventory');
db.createCollection('User');
db.createCollection('Order');



//3. Open MongoDBCompass and navigate to the "ProductOrder" database and add json files data into the respective collections.
//Screenshots of data insertion into the collections is presented in the document



//4. Display the first 5 rows of product, inventory, user, and order collection. 
db.Product.find().limit(5);
db.Inventory.find().limit(5);
db.User.find().limit(5);
db.Order.find().limit(5);



//5. Display the Unique Brand and Model names from the Product collection. 
db.Product.aggregate([{$group: {
  _id: {brand: '$brand',model: '$model'}
  }
}]);



//6. Find the maximum and minimum price of the given products.
db.Product.aggregate([
    {
        $group: {
          _id: null,
          min: {  $min: '$price'},
          max: {  $max: '$price'}
        }
    }
]);



//7. Display the quantity and last_updated date and time for sku "SNY-11001".
db.Inventory.find({'sku':'SNY-11001'},{'_id':0,'sku':1, 'quantity':1, 'last_updated':1});



//8. List down the count of the total number of users whose role is identified as 'Supplier' from User collection.
db.User.find({role:'Supplier'}).count();



//9. Display 'sku', 'code', 'price', 'brand' and 'warranty' information for the model 'Bravia-X'.
db.Product.find({model:'Bravia-X'},{_id:0, sku:1, code:1, price:1, brand:1, warranty:1, model:1}); 



//10. Find all the information of Sony products which have an Price greater than 1 lakh.
db.Product.find({brand:'Sony' , price: {$gt : 100000}},{_id:0});



//11. Find the total no of products by each Brand and sort them in descending order.
db.Product.aggregate([
    {
        $group: {
            _id: '$brand',
            count: {$count: {}}
        }          
}
]).sort({count:-1}) ;



//12. Find the total no of users by each role, sort them is descending order and save the results in the temporary collection.
db.User.aggregate([
    { $group: { _id: '$role', count: { $count: {} } } },
    { $out: 'temp_role_count_collection'}
]).sort({count:-1});
