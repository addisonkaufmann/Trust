app.factory ('Icons', function(){
    var home = 'img/icons/';
    return {
        home: function(){
            return home;
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
        'side': 'left'
    },
    {
        'state': 'info',
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': iconHome + 'info_icon.png',
        'valid': true,
        'side': 'right',
        'carousel': true
    },
    {
        'state': 'detail',
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'image': iconHome + 'detail_icon.png',
        'valid': true,
        'link': 'detail',
        'side': 'left',
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
        'side': 'left'
    },
    {
        'state': 'ingredient',
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'image': iconHome + 'ingredient_icon.png',
        'link': 'ingredient',
        'valid': true,
        'side': 'right'
    },
    {
        'state': 'water',
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'image': iconHome + 'water_icon.png',
        'link': 'water',
        'valid': true,
        'side': 'left'
    },
    {
        'state': 'recipe',
        'color': 'dark-green',
        'content': 'Ricette',
        'image': iconHome + 'recipe_icon.png',
        'link': 'recipe.list',
        'valid': true,
        'side': 'right', 
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


