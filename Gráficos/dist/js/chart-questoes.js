var titleQuestao = '';
var dataProviderQuestoes = {"dataProvider" : []};
var questao_pesquisa = [];
var nomePesquisa;
var aQuestao, bQuestao, cQuestao, dQuestao, eQuestao;

const resetParametrosQuestao = function() {
  titleQuestao = '';
  dataProviderQuestoes = {"dataProvider" : []};
  questao_pesquisa = [];
  nomePesquisa = '';
  aQuestao = 0; bQuestao = 0; cQuestao = 0; dQuestao = 0; eQuestao = 0;
};

const popularListaDeQuestoes = function(listaQuestao) {
  var lista = '<li><a href="#"></a></li>';

  $.each(listaQuestao, function(index, questao) {
    lista += '<li id="listItemP'+ index +'"><a type="button" onclick="exibirGraficoQuestao(' + index + ')">';

    var labelLink = (questao.values.dsc_questao.value.trim().length > 0) ? questao.values.dsc_questao.value.trim() : questao.values.id_questao.value;

    lista += labelLink + '</a></li>';
  });

  $("#lista-questoes").html(lista);
};

const exibirGraficoQuestao = function(indexQuestao) {
  const chartId = 'chart-questoes';

  resetParametrosQuestao();
  var questao = dataQuestoes.restify.rows[indexQuestao];

  titleQuestao = questao.values.dsc_questao.value.trim().length < 1 ? 'Sem Nome ' + questao.values.id_questao.value : questao.values.dsc_questao.value;

  $("#" + chartId).html('Carregando...');
  $.get('http://smartsoft.com.br/webservice/restifydb/Employees/web_resposta?_filter=id_questao%3D%3D'+ questao.values.id_questao.value +'&_sort=id_pesquisa+asc&_view=json', function(response) {
    if (response.restify.rows.length > 0) {
      // pesquisa tem duas dimensões
      // 1 -> id Pesquisa
      //  1.2 -> NomePesquisa, numRespoA, numRespB, numRespC, numRespD, numRespE
      var pesquisas = [];

      $.each(response.restify.rows, function(index, resposta) {
          var idPesquisa = resposta.values.id_pesquisa.value;
          var nmPesquisa = resposta.values.id_pesquisa.outReference.values.dsc_pesquisa;

          var valResposta = resposta.values.num_resposta.value;

          if (pesquisas[idPesquisa] == undefined) {
            pesquisas[idPesquisa] = [];
          }

          pesquisas[idPesquisa]['dsc_pesquisa'] = nmPesquisa.trim().length > 0 ? nmPesquisa : idPesquisa;

          if (pesquisas[idPesquisa][valResposta] == undefined) {
            pesquisas[idPesquisa][valResposta] = 0;
          } else {
            pesquisas[idPesquisa][valResposta]++;
          }
        });

      $.each(pesquisas, function(idPesquisa, pesquisa) {
        if (pesquisa == undefined) {
          return true;
        }

        var a = pesquisa[0] != undefined ? pesquisa[0] : 0;
        var b = pesquisa[1] != undefined ? pesquisa[1] : 0;
        var c = pesquisa[2] != undefined ? pesquisa[2] : 0;
        var d = pesquisa[3] != undefined ? pesquisa[3] : 0;
        var e = pesquisa[4] != undefined ? pesquisa[4] : 0;

        dataProviderQuestoes.dataProvider.push({
          "category": pesquisa['dsc_pesquisa'],
          "column-1": a,
          "column-2": b,
          "column-3": c,
          "column-4": d,
          "column-5": e,
          "column-6": a + b + c + d + e
        });
      });

      var sideBarTitle = 'Quantidade de Respostas por Pesquisa';

      showChart(chartId, titleQuestao, dataProviderQuestoes, sideBarTitle);
    } else {
      $("#" + chartId).html('Nenhuma Pesquisa Aplicada à questão: ' + titleQuestao);
    }
  }, 'json');
};
