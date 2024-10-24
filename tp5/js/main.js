var app;
window.onload = function () {
  app = new Vue({
    el: "#weatherApp", // cible l'élément HTML où nous utiliserons toutes les variables ci-dessous
    data: {
      // Indicateur de chargement de l'application
      loaded: false,

      // Ville saisie dans le formulaire via v-model
      formCityName: "",

      // Message de chargement
      message: "WebApp Loaded.",
      messageForm: "",

      // Liste des villes saisies, initialisée avec Paris
      cityList: [
        {
          name: "Paris",
        },
      ],

      // Stockage des données météo reçues
      cityWeather: null,

      // Indicateur de chargement des données météo
      cityWeatherLoading: false,
    },

    // 'mounted' est exécuté une fois que l'application VUE est entièrement chargée
    mounted: function () {
      this.loaded = true;
      this.readData();
    },

    // Méthodes pour gérer les données de l'application
    methods: {
      // Lecture des données de la liste des villes
      readData: function () {
        console.log("Liste des villes :", JSON.stringify(this.cityList));
        console.log("App Loaded:", this.loaded);
      },
      
      // Ajouter une ville à la liste
      addCity: function (event) {
        event.preventDefault(); // évite le rechargement de la page à la soumission
  
        // Vérifier si la ville existe déjà
        if (this.isCityExist(this.formCityName)) {
          this.messageForm = "existe déjà";
        } else {
          this.cityList.push({ name: this.formCityName });  // Ajouter la ville
          this.formCityName = "";  // Réinitialiser le champ de saisie
          this.messageForm = "";  // Réinitialiser le message d'erreur
        }
      },

      // Vérifie si la ville existe déjà dans la liste
    isCityExist: function (_cityName) {
        return (
          this.cityList.filter(
            (city) => city.name.toUpperCase() === _cityName.toUpperCase()
          ).length > 0
        );
      },

      // Supprimer une ville de la liste
      remove: function (_city) {
        this.cityList = this.cityList.filter(city => city.name !== _city.name);
        console.log("Ville supprimée :", _city.name);
      },

      // Méthode future pour récupérer les données météo
      meteo: function (_city) {
        // À compléter dans les prochaines étapes
      },
    

      // Récupérer les données météo depuis OpenWeatherMap
      meteo: function (_city) {
                    this.cityWeatherLoading = true;
            
                    fetch(
                      'https://api.openweathermap.org/data/2.5/weather?q=' +
                        _city.name +
                        '&units=metric&lang=fr&appid=e9c0c04a1e532f249e1b33b525b3bcc9'
                    )
                      .then((response) => response.json())
                      .then((json) => {
                        this.cityWeatherLoading = false;
            
                        // Vérifie si la ville est trouvée (code 200)
                        if (json.cod == 200) {
                          this.cityWeather = json;
                          this.message = null;
                          console.log("Météo pour", _city.name, json);
                        } else {
                          // Si la ville n'est pas trouvée (ex: 404)
                          this.cityWeather = null;
                          this.message =
                            "Météo introuvable pour " +
                            _city.name +
                            " (" +
                            json.message +
                            ")";
                        }
                      })
                      .catch((error) => {
                        this.cityWeatherLoading = false;
                        this.message = "Erreur lors de la récupération des données météo.";
                        console.error(error);
                      });
                  }, 
    },
  });
};
