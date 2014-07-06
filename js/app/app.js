var loadUsers = function(){
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/orgs/dsmjs/members',
      success: function(response){
        for(var i = 0; i < response.length; i++){
          var user = response[i];
          var opt = $('<option></option>').attr("value", user.login).text(user.login);
          $('#users').append(opt);
        }
      }
    });
};

var usersClickHandler = function(){
    $('#languages').children('option:not(:first)').remove();
    if(!this.value){
      $('#languages-section').hide();
      return;
    }
    $('#languages-section').show();
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/' + this.value + '/repos',
      success: function(response){
        var repos = {};
        for(var i = 0; i < response.length; i++){
          var repo = response[i];
          repos[repo.language] = repo.language;
        }
        for(var key in repos){
          var opt = $('<option></option>').attr("value", key).text(key);
          $('#languages').append(opt);
        }
      }
    });
};
$(document).on('change', "#users", usersClickHandler)

var languagesClickHandler = function(){
    $('#repos').children().remove()
    if(!this.value){
      $('#repos-section').hide();
      return;
    }
    $('#repos-section').show();
    var self = this;
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/' + $('#users').val() + '/repos',
      success: function(response){
        for(var i = 0; i < response.length; i++){
          var repo = response[i];
          console.log(repo.language);
          console.log(self.value);
          if (repo.language === self.value){
            var element = '<a href="' + repo.html_url + '"></a>'
            var link = $(element).text(repo.name);
            $('#repos').append(link);
            $('#repos').append('<br />');
          }
        }
      }
    });
};
$(document).on('change', "#languages", languagesClickHandler)
