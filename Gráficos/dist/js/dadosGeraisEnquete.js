var numParticipantes;
var numPerguntas;
var numRespostas;

var dataParticipantes;


var dataRespostas;


var dataPesquisas;


var dataQuestoes;
var dataQuestoesPorId = [];

$(function() {
  $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_resposta?_view=json', function(response) {
    dataRespostas = response;
    $("#num-respostas").html(dataRespostas.restify.rows.length);
  }, 'json');

  $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_participante?_view=json', function(response) {
    dataParticipantes = response;
    $("#num-participantes").html(dataParticipantes.restify.rows.length);
  }, 'json');

  $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_pesquisa?_view=json&_sort=dsc_pesquisa+asc', function(response) {
    dataPesquisas = response;
    $("#num-pesquisas").html(dataPesquisas.restify.rows.length);
    popularListaDePesquisas(dataPesquisas.restify.rows)
  }, 'json');

  $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_questao?_view=json', function(response) {
    dataQuestoes = response;
    $("#num-questoes").html(dataQuestoes.restify.rows.length);
    popularListaDeQuestoes(dataQuestoes.restify.rows);
  }, 'json');
});
