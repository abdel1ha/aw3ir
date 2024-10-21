// store.js
// Script pour gérer la liste de contact en JSON

var contactStore = (function () {
    // Récupération de la liste de contacts depuis le localStorage
    let contactListString = localStorage.getItem("contactList");
    var contactList = contactListString ? JSON.parse(contactListString) : [];
  
    return {
      // Ajouter un contact à la liste
      add: function (_name, _firstname, _date, _adress, _mail) {
        var contact = {
          name: _name,
          firstname: _firstname,
          date: _date,
          adress: _adress,
          mail: _mail,
        };
  
        // Ajouter le contact à la liste
        contactList.push(contact);
  
        // Sauvegarder la liste mise à jour dans le localStorage
        localStorage.setItem("contactList", JSON.stringify(contactList));
  
        return contactList;
      },
  
      // Réinitialiser la liste des contacts
      reset: function () {
        localStorage.removeItem("contactList");
        contactList = [];
        return contactList;
      },
  
      // Récupérer la liste des contacts
      getList: function () {
        return contactList;
      },
    };
  })();
  