app.factory('Recipes', function($http) {
  return {
    getAll: function(total) {
      return $http.get('http://localhost:8080/trust/api/timeline/getRecipeByFarmIdAndProductionId/15/221/0/' + total);  //1. this returns promise
    }
  };
});


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

app.factory('Images', function(Image) {
  /*
   * anything created will be stored in this cache object,
   * based on the arguments passed to `getObj`.
   * If you need multiple arguments, you could form them into a string,
   * and use that as the cache key
   * since there's only one argument here, I'll just use that
   */
  var cache = {};

    return {
        getAll: function(obj) {
            // console.log(cache);
          //if we haven't created an array with this argument before
          if (!cache[obj.id]) {
            //create one and store it in the cache with that argument as the key
            cache[obj.id] = [
              new Image('http://localhost:8080/trust/api/file/getImageWithFarm/' + obj.farmId + '/normal/' + obj.image, true),
              new Image('img/farm-logo.jpg', false)
            ];
          }
          //return the cached array
          return cache[obj.id];
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

    var iconhome = Icons.home();

    var contactPush = function(data, type){
        var content;
        if (type === 'address'){
            content = angular.fromJson(data.address).address;
        }else{
            content = data[type];
        }
        if (content){
            contacts.push(
                new Contact(type, iconhome + 'contact_' + type + '.png', content)
            );
        }
    };

    var generate = function(data){
        contactPush(data, 'website');
        contactPush(data, 'address');
        contactPush(data, 'email');
        contactPush(data, 'phone');
        contactPush(data, 'facebookPage');

    };

    return {
        all: function(data){
            if (contacts.length === 0){
                generate(data);
            }
            return contacts;
        }
    };
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
        'valid': true
    },
    {
        'state': 'detail',
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'link': 'detail',
        'image': iconHome + 'detail_icon.png',
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



