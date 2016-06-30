app.factory ('Icons', function(){
    var home = 'img/icons/';
    return {
        home: function(){
            return home;
        }, 
        menu: function(){
            return home + 'menu_icon.png';
        }

    };
});


app.factory ('Images', function(Image){
    var images = {};
    return {
        all: function(){
            // console.log(images);
            return images;
        },
        get: function(id){
            console.log('getting ' + id);
            images[id][0].active = true;
            console.log(images[id]);
            return images[id];
        },
        generateFromTimelineChilds: function(obj){
            images = {};
            console.log('generate from timeline childs of:');
            console.log(obj);
            var i = 0;
            var len = obj.timelineChilds.length;
            

            for (; i < len; i++){
                images[obj.timelineChilds[i].id] = [];
                images[obj.timelineChilds[i].id].push(new Image('http://localhost:8080/trust/api/file/getImageWithFarm/13/normal/' + obj.timelineChilds[i].image, false));
            }
            console.log(images);

        }, 
        generateFromProductDescr: function(obj){
            // console.log(obj);
            images[obj.id] = [];
            var i = 0;
            var len = obj.productDescr.length;
            for(; i < len; i++){
                if (obj.productDescr[i].key === "IMAGE"){
                    images[obj.id].push(new Image('http://localhost:8080/trust/api/file/getImageWithFarm/13/normal/' + obj.productDescr[i].value, false));
                }
            }
        },


        generateFromRecipeList: function(obj){
            // console.log(obj);
            var i = 0;
            var len = obj.list.length;
            

            for (; i < len; i++){
                images[obj.list[i].id] = [];
                images[obj.list[i].id].push(new Image('http://localhost:8080/trust/api/file/getImageWithFarm/15/thumbnail/' + obj.list[i].image, false));
            }
            console.log(images);
        }
    };
});

app.service('Image', function(){
    var Image = function(image, active){
        this.image = image;
        this.active = active;
    };
    return Image;
});

app.service('Contacts', function(Icons, Contact){
    var contacts = [];

    return {
        generate: function(data){
            var iconhome = Icons.home();
            if (angular.fromJson(data.address).address){
                contacts.push(
                    new Contact('address', iconhome + 'contact_address.png', angular.fromJson(data.address).address)
                );
            }

            if (data.website){
                contacts.push(
                    new Contact('address', iconhome + 'contact_website.png', data.website)
                );
            }

            if (data.phone){
                contacts.push(
                    new Contact('phone', iconhome + 'contact_phone.png', data.phone)
                );
            }

            if (data.email){
                contacts.push(
                    new Contact('email', iconhome + 'contact_mail.png', data.email)
                );
            }

            if (data.facebookPage){
                contacts.push(
                    new Contact('facebook', iconhome + 'contact_facebook.png', data.facebookPage)
                );
            }
        }, 
        all: function(){
            return contacts;
        }
    }
});

app.service('Contact', function(){
    var Contact = function(type, img, val){
        this.type = type;
        this.img = img;
        this.value = val;
    };
    return Contact;
});

app.factory('Social', function(Icons){
    var iconhome = Icons.home();
    var social = [
        {
            'name': 'facebook', 
            'icon': iconhome + 'social_facebook.png'
        }, 
        {
            'name': 'instagram', 
            'icon': iconhome + 'social_instagram.png'
        }, 
        {
            'name': 'twitter', 
            'icon': iconhome + 'social_twitter.png'
        },
        {
            'name': 'pinterest', 
            'icon': iconhome + 'social_pinterest.png'
        },
        {
            'name': 'reddit', 
            'icon': iconhome + 'social_reddit.png'
        },
        {
            'name': 'googleplus', 
            'icon': iconhome + 'social_googleplus.png'
        }
    ];
    return {
        all: function(){
            return social;
        }

    };
});
app.factory('Tiles', function(){
    var iconHome = 'img/icons/';
    var tiles = [{
        'state': 'profile',
        'color': 'light-green',
        'content': 'Azienda agricola',
        'link': 'profile',
        'image': iconHome + 'profile_icon.png',
        'valid': true
    },
    {
        'state': 'info',
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': iconHome + 'info_icon.png',
        'carousel': true,
        'valid': true
    },
    {
        'state': 'detail',
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'link': 'detail',
        'image': iconHome + 'detail_icon.png',
        'carousel': true,
        'valid': true
    },
    {
        'state': 'nutrition',
        'color': 'red',
        'content': 'Valori nutrizionali',
        'link': 'nutrition',
        'image': iconHome + 'nutrition_icon.png',
        'valid': true
    },
    {
        'state': 'co2impact',
        'color': 'brown',
        'content': 'Impatto CO2',
        'link': 'co2impact',
        'image': iconHome + 'co2impact_icon.png',
        'valid': true
    },
    {
        'state': 'ingredient',
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'link': 'ingredient',
        'image': iconHome + 'ingredient_icon.png',
        'valid': true
    },
    {
        'state': 'water',
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'link': 'water',
        'image': iconHome + 'water_icon.png',
        'valid': true
    },
    {
        'state': 'recipe',
        'color': 'dark-green',
        'content': 'Ricette',
        'link': 'recipe.list',
        'image': iconHome + 'recipe_icon.png',
        'carousel': true,
        'valid': true
    }];

    var validTiles = tiles.filter(function(tile){
        return tile.valid === true;
    });

    return {
        all: function(){
            return tiles;
        },
        get: function(state){
            var array =  tiles.filter(function(tile){
                return tile.state === state;
            });
            return array[0];
        }, 
        getValid: function(){
            return validTiles;
        }    
    };
});

app.factory('TileClasses', function(){
    var tileclasses = [
        {'num': 2, 'classes':'col-xs-12 col-md-6 full'},
        {'num': 3, 'classes':'col-xs-12 col-md-4 full' },
        {'num': 4, 'classes':'col-xs-6 col-md-6'},
        {'num': 5, 'classes':'col-xs-6 col-md-4','first':'col-xs-12 col-md-4 full'},
        {'num': 6, 'classes':'col-xs-6 col-md-4' },
        {'num': 7, 'classes':'col-xs-6 col-md-3','first':'col-xs-12 col-md-3 full'},
        {'num': 8, 'classes':'col-xs-6 col-md-3'}
    ];
    return {
        get: function(num){
            var array =  tileclasses.filter(function(obj){
                return obj.num === num;
            });
            return array[0];
        }, 
    };
});



