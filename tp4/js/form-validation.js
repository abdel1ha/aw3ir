// document.querySelector('form').addEventListener('submit', function (event) {
//     var nom = document.getElementById('nom').value;
//     var prenom = document.getElementById('prenom').value;
//     var dateNaissance = document.getElementById('dateNaissance').value;
//     var adresse = document.getElementById('adresse').value;
//     var email = document.getElementById('email').value;
  
//     if (!nom || !prenom || !dateNaissance || !adresse || !email) {
//       event.preventDefault(); // Empêche la soumission du formulaire si des champs sont vides
//       alert('Veuillez remplir tous les champs.');
//     }
//   });
  
// Validation et soumission du formulaire
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la soumission par défaut

    // Récupération des valeurs des champs
    var nom = document.getElementById('nom').value.trim();
    var prenom = document.getElementById('prenom').value.trim();
    var dateNaissance = document.getElementById('dateNaissance').value;
    var adresse = document.getElementById('adresse').value.trim();
    var email = document.getElementById('email').value.trim();

    // Vérification si tous les champs sont remplis
    if (!nom || !prenom || !dateNaissance || !adresse || !email) {
        alert('Veuillez remplir tous les champs.');
        return; // Arrête la fonction ici
    }

    // Vérification que la date de naissance n'est pas dans le futur
    var today = new Date().setHours(0, 0, 0, 0); // Date actuelle à minuit
    var selectedDate = new Date(dateNaissance).setHours(0, 0, 0, 0); // Date de naissance sélectionnée à minuit

    if (selectedDate > today) {
        alert('La date de naissance ne peut pas être dans le futur.');
        return; // Arrête la fonction ici
    }

    // Si toutes les conditions sont valides, ajouter le contact
    contactStore.add(nom, prenom, dateNaissance, adresse, email);

    // Mettre à jour l'affichage de la liste
    displayContactList();

    // Afficher le message de succès uniquement si tout est validé
    alert('Contact ajouté avec succès !');

    // Optionnel: Réinitialiser le formulaire après ajout
    document.querySelector('form').reset();
});

// Fonction pour définir la date maximale (date actuelle) pour le champ de date de naissance
function setMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ajoute un '0' si nécessaire
    const day = String(today.getDate()).padStart(2, '0'); // Ajoute un '0' si nécessaire

    // Formater la date comme 'YYYY-MM-DD' pour l'attribut max
    const maxDate = `${year}-${month}-${day}`;

    // Appliquer la date maximale au champ de date
    document.getElementById('dateNaissance').setAttribute('max', maxDate);
}

// Appeler la fonction pour définir la date maximale dès le chargement de la page
window.onload = function() {
    setMaxDate();
};
