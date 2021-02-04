const express = require('express')
const bodyParser= require('body-parser');
const app = express();
const MongoClient= require('mongodb').MongoClient;

////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
////////////////////////////////////////////////////////


MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;

        var db = client.db('tpNodeApi');
        var utilisateurs = db.collection('utilisateurs');

        app.get('/utilisateurs/search', (req, res)=>{

            utilisateurs.find(id, function(err, result){
                if(err) throw err;
                //console.log(result);
                res.json({
                    status: 200,
                    result,
                    message: "Liste des utilisateurs chargée avec succés"
                })
            });
        });
    
        
        app.post('/utilisateurs/add', (req, res) => {
        
            var data = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                adresse: req.body.adresse
            };
        
            utilisateurs.insertOne(data, function (err, rows) {
                    if (err) throw err;
                    console.log("Ajout réussi")
                    res.json({
                        data,
                        status: 200,
                        message: "Ajout d'un utilisateur réussi"
                    })
                });
            });
        
        
    
        // app.put('/utilisateurs/update', (req, res) => {
        
        //     var data = {
        //         id: req.body.id,
        //         nom: req.body.nom,
        //         prenom: req.body.prenom,
        //         adresse: req.body.adresse
        //     };
        
        //     utilisateurs.updateOne(data.id, data,function (err, rows) {
        //             if (err) throw err;
        //             console.log("Mise à jour reussie");
        //             res.json({
        //                 data,
        //                 status: 200,
        //                 message: "Person updated successfully"
        //             })
        //         });
        
        

        app.get('/utilisateurs/select/:id', (req, res) => {

            var id = req.params._id;
            var data = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                adresse: req.body.adresse
            };
        
            utilisateurs.find({id}, (err, rows) =>{
                    if (err) throw err;
                    res.json({
                        id,
                        status: 200,
                        message: " Personne selectionnée avec succés"
                    })
                });
        });
    
        
       
        app.delete('/utilisateurs/delete/:id', (req, res) => {
        
            var id = req.params._id;
            
            utilisateurs.deleteOne({id},(err, rows) =>{
                    if (err) throw err;
                    console.log("Suppression reussie");
                    res.json({
                        status: 200,
                        message: "Suppression de l'utilisateur"
                    })
                });
        });
        
    });



app.listen(8080, ()=>{
    console.log('Server is up and running ;-)')
})