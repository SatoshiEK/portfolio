var titlePesquisa = '';
var dataProviderPesquisas = {"dataProvider" : []};
var pesquisa_questao = [];
var nomeQuestao;
var a, b, c, d, e;

const resetParametrosPesquisa = function() {
  titlePesquisa = '';
  dataProviderPesquisas = {"dataProvider" : []};
  pesquisa_questao = [];
  nomeQuestao = '';
  a = 0, b = 0, c = 0, d = 0, e = 0;
};

const popularListaDePesquisas = function(listaPesquisa) {
  var lista = '<li><a href="#"></a></li>';

  $.each(listaPesquisa, function(index, pesquisa) {
    lista += '<li id="listItemP'+ index +'"><a type="button" onclick="exibirGraficoPesquisa(' + index + ')">';

    var labelLink = (pesquisa.values.dsc_pesquisa.value.trim().length > 0) ? pesquisa.values.dsc_pesquisa.value.trim() : pesquisa.values.id_pesquisa.value;

    lista += labelLink + '</a></li>';
  });

  $("#lista-pesquisas").html(lista);
};

const exibirGraficoPesquisa = function(indexPesquisa) {
  resetParametrosPesquisa();
  var pesquisa = dataPesquisas.restify.rows[indexPesquisa];
  titlePesquisa = pesquisa.values.dsc_pesquisa.value.trim().length < 1 ? 'Sem Nome ' +  pesquisa.values.id_pesquisa.value : pesquisa.values.dsc_pesquisa.value;

  buscarQuestoes(pesquisa);
};


const buscarQuestoes = function(pesquisa) {
  var url_pesquisa_questao = 'http://smartsoft.com.br/webservice/restifydb/Employees/web_pesquisa_questao?_filter=id_pesquisa%3D%3D' + pesquisa.values.id_pesquisa.value + '&_view=json';

  $.get(url_pesquisa_questao, function(response) {
    var rows = response.restify.rows;

    $.each(rows, function(index, row) {
      pesquisa_questao[index] = row;
    });

    buscarRespostas();
  }, 'json');
};


const buscarRespostas = function() {
  $.each(pesquisa_questao, function(index, questao) {
    //Exemplo: http://smartsoft.com.br/webservice/restifydb/Employees/web_resposta?_filter=id_pesquisa%3D%3D3%26%26id_questao%3D%3D1&_view=json

    nomeQuestao = questao.values.id_questao.outReference.values.dsc_questao;
    a = 0;b = 0;c = 0;d = 0;e = 0;
    $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_resposta?_filter=id_pesquisa%3D%3D'+ questao.values.id_pesquisa.value +'%26%26id_questao%3D%3D'+ questao.values.id_questao.value +'&_view=json', function(response) {
      var respostas = response.restify.rows;
      $.each(respostas, function(index, resposta) {
        switch (resposta.values.num_resposta.value) {
          case '0':
            a++;
            break;
          case '1':
            b++;
            break;
          case '2':
            c++;
            break;
          case '3':
            d++;
            break;
          case '4':
            e++;
            break;
        }
      });
      addGraphQuestaoResposta(nomeQuestao, a, b, c, d, e);
    }, 'json');

  }, 'json');


  var chartId = 'chart-pesquisas';
  var sideBarTitle = 'Quantidade de Respostas por Questão';
  showChart(chartId, titlePesquisa, dataProviderPesquisas, sideBarTitle);
  window.setTimeout(function() {
    showChart(chartId, titlePesquisa, dataProviderPesquisas, sideBarTitle);
  }, 2000);
};

const addGraphQuestaoResposta = function(nomeQuestao, a, b, c, d, e) {
  dataProviderPesquisas.dataProvider.push({
    "category": nomeQuestao,
    "column-1": a,
    "column-2": b,
    "column-3": c,
    "column-4": d,
    "column-5": e,
    "column-6": a + b + c + d + e
  });
};

$(function() {

});
