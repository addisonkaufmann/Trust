// app.service('iconhomeServ', function() {
//     this.iconhome = 'img/icons/';
// });

// app.service('bulkServ', function(iconhomeServ) {
//     this.iconhome = iconhomeServ.iconhome;
//     this.profile = {
//         'color': 'light-green',
//         'content': 'Azienda agricola',
//         'link': 'profile',
//         'image': this.iconhome + 'profile_icon.png' ,
//         'valid': true,
//         'side': 'left'
//     };

//     this.info = {
//         'color': 'yellow',
//         'content': 'Informazioni prodotto',
//         'link': 'info',
//         'image': this.iconhome + 'info_icon.png',
//         'valid': true,
//         'side': 'right',
//         'carousel': true
//     };

//     this.detail = {
//         'color': 'orange',
//         'content': 'Dettagli prodotto',
//         'image': this.iconhome + 'detail_icon.png',
//         'valid': true,
//         'link': 'detail',
//         'side': 'left',
//         'carousel': true
//     };

//     this.nutrition = {
//         'color': 'red',
//         'content': 'Valori nutrizionali',
//         'image': this.iconhome + 'nutrition_icon.png',
//         'link': 'nutrition',
//         'valid': true,
//         'side': 'right'
//     };

//     this.co2impact = {
//         'color': 'brown',
//         'content': 'Impatto CO2',
//         'image': this.iconhome + 'co2impact_icon.png',
//         'link': 'co2impact',
//         'valid': true,
//         'side': 'left'
//     };

//     this.ingredient = {
//         'color': 'purple',
//         'content': 'Ingredienti particolari',
//         'image': this.iconhome + 'ingredient_icon.png',
//         'link': 'ingredient',
//         'valid': true,
//         'side': 'right'
//     };

//     this.water = {
//         'color': 'blue',
//         'content': 'Utilizzo acqua',
//         'image': this.iconhome + 'water_icon.png',
//         'link': 'water',
//         'valid': true,
//         'side': 'left'
//     };

//     this.recipe = {
//         'color': 'dark-green',
//         'content': 'Ricette',
//         'image': this.iconhome + 'recipe_icon.png',
//         'link': 'recipe',
//         'valid': true,
//         'side': 'right', 
//         'carousel': true
//     };
// });


app.factory ('Icons', function(){
    var home = 'img/icons/';
    return {
        home: function(){
            return home;
        }

    };
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


