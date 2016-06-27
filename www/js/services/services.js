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
        'image': iconHome + 'profile_icon.png' ,
        'valid': true,
    },
    {
        'state': 'info',
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': iconHome + 'info_icon.png',
        'valid': true,
        'carousel': true
    },
    {
        'state': 'detail',
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'image': iconHome + 'detail_icon.png',
        'valid': true,
        'link': 'detail',
        'carousel': true
    },
    {
        'state': 'nutrition',
        'color': 'red',
        'content': 'Valori nutrizionali',
        'image': iconHome + 'nutrition_icon.png',
        'link': 'nutrition',
        'valid': true,
        'side': 'right'
    },
    {
        'state': 'co2impact',
        'color': 'brown',
        'content': 'Impatto CO2',
        'image': iconHome + 'co2impact_icon.png',
        'link': 'co2impact',
        'valid': true,
    },
    {
        'state': 'ingredient',
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'image': iconHome + 'ingredient_icon.png',
        'link': 'ingredient',
        'valid': true,
    },
    {
        'state': 'water',
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'image': iconHome + 'water_icon.png',
        'link': 'water',
        'valid': true,
    },
    {
        'state': 'recipe',
        'color': 'dark-green',
        'content': 'Ricette',
        'image': iconHome + 'recipe_icon.png',
        'link': 'recipe.list',
        'valid': true,
        'carousel': true
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



