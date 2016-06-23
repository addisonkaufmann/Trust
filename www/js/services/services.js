app.service('iconhomeServ', function() {
    this.iconhome = 'img/icons/';
});


app.service('bulkServ', function(iconhomeServ) {

    this.iconhome = iconhomeServ.iconhome;

    this.profile = {
        'color': 'light-green',
        'content': 'Azienda agricola',
        'link': 'profile',
        'image': this.iconhome + 'profile_icon.png' ,
        'valid': true,
        'side': 'left'
    };

    this.info = {
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': this.iconhome + 'info_icon.png',
        'valid': true,
        'side': 'right',
        'carousel': true
    };

    this.detail = {
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'image': this.iconhome + 'detail_icon.png',
        'valid': true,
        'link': 'detail',
        'side': 'left',
        'carousel': true
    };

    this.nutrition = {
        'color': 'red',
        'content': 'Valori nutrizionali',
        'image': this.iconhome + 'nutrition_icon.png',
        'link': 'nutrition',
        'valid': true,
        'side': 'right'
    };

    this.co2impact = {
        'color': 'brown',
        'content': 'Impatto CO2',
        'image': this.iconhome + 'co2impact_icon.png',
        'link': 'co2impact',
        'valid': true,
        'side': 'left'
    };

    this.ingredient = {
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'image': this.iconhome + 'ingredient_icon.png',
        'link': 'ingredient',
        'valid': true,
        'side': 'right'
    };

    this.water = {
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'image': this.iconhome + 'water_icon.png',
        'link': 'water',
        'valid': true,
        'side': 'left'
    };

    this.recipe = {
        'color': 'dark-green',
        'content': 'Ricette',
        'image': this.iconhome + 'recipe_icon.png',
        'link': 'recipe',
        'valid': true,
        'side': 'right', 
        'carousel': true
    };

});


