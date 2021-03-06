<?php require $_SERVER['DOCUMENT_ROOT'] . '/include/core.php' ?>
<!DOCTYPE html>
<html lang="pt-BR">

  <?php $core->include('head-opening') ?>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css?v=0.0.1">
  <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,900" rel="stylesheet">

  <title><?= $app->title ?> – Estadão</title>

  <?php $core->include('seo') ?>
  <?php $core->include('sharing') ?>
  <?php $core->include('favicon') ?>

  <?php $core->include('head-closing') ?>

  <body>

    <?php $core->include('body-opening') ?>


    <div class="estado-header">
      <a href="https://www.estadao.com.br/">
        <img src="media/logo/estadao-logo.svg" class="logo">
      </a>
    </div>

    <div class="content">

        <div class="title-holder">

          <span class="common">Quero comparar</span>


          <span class="common">o avanço do novo coronavírus no</span>
          <span class="common"><span class="brazil">Brasil</span>
          <span class="versus">✕</span>

           <select class="country-selector">

                <option value="China">China</option>
                <option value="South-Korea">Coréia do Sul</option>
                <option value="Spain">Espanha</option>
                <option value="United-States">EUA</option>
                <option value="France">França</option>
                <option value="Iran">Irã</option>
                <option value="Italy">Itália</option>
                <option value="Japan">Japão</option>
                <option value="United-Kingdom">Reino Unido</option>


          </select>


        </div>

        <div class="chart-explainer"></div>

        <div class="main-chart-wrapper">

          <div class="main-chart"></div>

          <p class="asterisk"><strong>Importante</strong>: Os dados são da ECDC* (o Centro Europeu para Controle e Prevenção de Doenças, na sigla em inglês), compilados diariamente pelo site <a href="https://ourworldindata.org/coronavirus-source-data" target="_blank" rel="noopener">Our World in Data</a>, ligado à Universidade de Oxford, na Inglaterra. <strong>Eles são atualizados de forma menos frequente que os dados do Ministério da Saúde</strong>, o que pode causar <strong>divergência com os números divulgados pelo governo brasileiro.</strong> Além disso, os números de casos confirmados estão relacionados à quantidade de testes de cada país. A Coreia do Sul, por exemplo, tenta testar a maior parte possível da população. No Brasil, o plano é testar apenas casos suspeitos, o que pode fazer com que o número de casos seja significativamente maior do que a contagem indica.</p>

        </div>

        <div class="author">

          <p class="author">Rodrigo Menegat e Daniel Bramatti</p>
          <p class="date">Texto publicado em 19 de março de 2020. Gráficos atualizados diariamente desde então.</p>

        </div>


        <div class ="paragraph">

            <p class="paragraph">No painel acima, você pode comparar a evolução dos novos casos de <strong>covid-19</strong>, a doença causada pelo novo coronavírus, em alguns dos países que mais foram afetados pela doença.</p>

            <p class="paragraph"><strong>Quando você fizer isso, preste atenção em um detalhe!</strong> Os gráficos estão em escala logarítmica. Repare na ordem dos números no canto esquerdo: eles começam em 100, mas logo passam para 1 mil, 10 mil e 100 mil.</p>

            <p class="paragraph">Um gráfico mais tradicional, com uma escala linear que cresce normalmente, não iria mostrar <a href="https://www.estadao.com.br/infograficos/saude,como-a-matematica-pode-ajudar-a-entender-e-combater-epidemias,1082298" target="blank" rel="noopener noreferer">a velocidade com que a doença se multiplica</a> no início de um surto local.</p>

            <p class="paragraph">Esse dado é crucial porque, como o novo coronavírus tem uma capacidade de <strong>crescimento exponencial</strong>, é tão importante olharmos para o <strong>ritmo de crescimento</strong> quanto para o total de casos.</p>

            <p class="paragraph">Em outras palavras, quando medidas de contenção adequadas não são tomadas, o número de doentes pode explodir em um curto período de tempo. A conta não é difícil de entender.</p>

            <p class="paragraph">Como cada pessoa com o vírus infecta em média outras duas, a progressão acontece da seguinte maneira: o primeiro caso gera mais dois. Estes dois geram mais quatro. Estes quatro geram mais oito. Esses oito geram 16. Esses 16 geram 32. Esses 32 geram 64. Esses 64 geram 128. Esses 128 geram 256…</p>

            <p class="paragraph">O último número é mais ou menos o patamar em que o Brasil se encontrava no dia 17 de março, poucos dias depois de governos estaduais e federais começarem a adotar medidas de contenção do contágio, como o <a href="https://saude.estadao.com.br/noticias/geral,o-que-abre-e-o-que-fecha-no-comercio-de-sao-paulo-durante-a-quarentena-do-coronavirus,70003240447" target="_blank" rel="noopener">fechamento do comércio em São Paulo</a> e o cancelamento das aulas em universidades e escolas.</p>

            <p class="paragraph">O Ministério da Saúde, entretanto, afirma que não tem condições de fazer testes diagnósticos em larga escala, o que contradiz as orientações da OMS. Hoje, o país só testa os casos suspeitos, o que pode fazer com que <a href="https://saude.estadao.com.br/noticias/geral,presidente-do-hospital-albert-einstein-preve-pico-do-novo-coronavirus-em-duas-semanas,70003239115" target="_blank", rel="noopener noreferer">o número de casos fique subestimado</a>.</p>


            <p class="paragraph">Entretanto, se o ritmo de crescimento seguir como está, a conta continua. Esses 256 geram 512. Esses 512 geram 1024. (Calma, é agora que os números ficam interessantes!) Esses 1024 geram 2048. Esses 2048 gram 4096. Esses 4096 geram 8192. Esses 8192 geram 16384… E, aí, já estamos com mais 30 mil novos casos a cada geração de contágio.</p>

            <p class="paragraph">É por isso que especialistas em saúde pública e a Organização Mundial da Saúde apostam suas fichas em estratégias que possam <strong><a href="https://www.estadao.com.br/infograficos/saude,coronavirus-simulador-do-washington-post,1084401" target="_blank" rel="noopener noreferer">"achatar a curva"</a></strong> - ou seja, fazer com que os gráficos em disparada que você viu acima em países como Itália e Espanha fiquem progressivamente mais retos, como os da China ou da Coreia do Sul.</p>

            <p class="paragraph">De acordo com <a href="https://www.imperial.ac.uk/news/196234/covid19-imperial-researchers-model-likely-impact/" target="_blank" rel="noopener noreferer">um estudo</a> divulgado pelo Imperial College London, com uma curva mais chata, a pandemia e as medidas de contenção devem durar um período longo, mas o número de pessoas com sintomas ao mesmo tempo seria menor. Isso evita a sobrecarga dos hospitais.</p>

            <p class="paragraph">A alternativa é que a crise dure menos tempo, mas com uma taxa de infecções capaz de fazer o sistema de saúde entrar em colapso. Essa realidade, na projeção do estudo, pode deixar milhões de mortos.</p>

            <p class="paragraph">Abaixo, veja como tem sido a resposta das autoridades de alguns dos países que mais foram atingidos pela doença:</p>


        </div>

        <div class="small-multiples">
        
          <h2 class="small-multiple-title">China</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 19 de janeiro</h3>
          <div class="small-multiple china"></div>


            <div class="paragraph">

              <p class="paragraph">Foi aqui que a epidemia começou, na cidade de Wuhan, ainda em dezembro de 2019. Depois de tentar esconder a gravidade do surto por semanas, o governo do país passou a estabelecer medidas rigorosas de distanciamento social e isolamento. No auge da crise, as cidades mais afetadas entraram em quarenta compulsória e generalizada, com controle rigoroso de quem saía de casa.</p>

              <p class="paragraph">Dois meses depois dos casos passarem das centenas, o número total de pessoas infectadas beira 100 mil, mas novos casos são raros. Hoje, o país limita a entrada de estrangeiros para evitar doentes "importados", ou seja, a entrada de estrangeiros que possam carregar o vírus de volta para o país.</p>

              <p class="paragraph">Existe o temor, entretanto, que a doença possa voltar a se espalhar conforme o governo alivar as medidas restritivas - processo que já foi iniciado, mas que deve acontecer de modo gradual.</p>

            </div>

          <h2 class="small-multiple-title">Coreia do Sul</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 21 de fevereiro</h3>
          <div class="small-multiple south-korea"></div>

            <div class="paragraph">

              <p class="paragraph">A Coreia do Sul também aparenta ter contido a curva de crescimento da doença, que chegou a dobrar de tamanho de um dia para o outro no início da epidemia local, quando o tempo médio para que isso aconteça costume ser de quatro dias.</p>

              <p class="paragraph">Um dos episódios mais marcantes foi o da 31º pessoa diagnosticada no país: uma paciente que teve febre, mas evitou testes e medidas de isolamento. Ela saiu para jantar e frequentou reuniões de sua igreja antes de ter o quadro confirmado, espalhando a doença para várias outras pessoas.</p>

              <p class="paragraph">A resposta dos sul-coreanas foi, a partir daí, evitar casos parecidos com o do paciente 31. As autoridades de saúde passaram a testar a população em larga escala para conseguir isolar as pessoas infectadas. Foram criadas barracas que fazem testes nas ruas e até em uma espécie de <em>drive-thru</em>.</p>

            </div>

          <h2 class="small-multiple-title">Espanha</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 3 de março</h3>
          <div class="small-multiple spain"></div>

            <div class="paragraph">

              <p class="paragraph">No sábado, dia 14 de março, o governo estendeu para todo o país medidas de emergência anteriormente em vigor apenas na capital, Madrid. O chamado “estado de alarme” determina que 47 milhões de pessoas fiquem em quarentena, e que só saiam à rua sozinhas e para fazer compras ou trabalhar.</p> 

              <p class="paragraph">Cidadãos que desrespeitarem as normas estarão sujeitos a multas de até 600 mil euros ou prisão de um ano, nos casos mais graves, em que se constate danos à saúde pública.</p> 

              <p class="paragraph">Os serviços de transporte aéreo, ferroviário, terrestre e marítimo tiveram a oferta reduzida em pelo menos 50%. O comércio foi fechado, com exceção das atividades consideradas de primeira necessidade, como supermercados e farmácias, por exemplo.</p>


            </div>

          <h2 class="small-multiple-title">Estados Unidos</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 4 de março</h3>
          <div class="small-multiple united-states"></div>

            <div class="paragraph">

              <p class="paragraph">Depois de desconsiderar a importância do coronavírus no começo da crise, o presidente Donald Trump determinou o fechamento dos aeroportos dos EUA para pessoas provenientes da Europa (com exceção de cidadãos norte-americanos).</p> 

              <p class="paragraph">As medidas mais fortes de restrição de circulação interna estão sendo tomadas por governos de Estados. Nas cidades de Nova York e San Francisco, por exemplo, há quarentena em vigor.</p>


            </div>

          <h2 class="small-multiple-title">França</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 2 de março</h3>
          <div class="small-multiple france"></div>

            <div class="paragraph">

              <p class="paragraph">Escolas, universidades e atrações turísticas foram fechadas. O segundo turno das eleições municipais foi adiado. Na terça-feira, 17 de março, o presidente Emmanuel Macron ampliou as medidas restritivas: toda a população deverá permanecer em casa por pelo menos duas semanas. Apenas deslocamentos essenciais serão permitidos, e haverá punição para quem violar as regras.</p>

              <p class="paragraph">Com a paralisação do transporte público, o governo determinou que veículos militares sejam usados para transportar doentes aos hospitais, em caso de necessidade.</p>


            </div>

          <h2 class="small-multiple-title">Irã</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 28 de fevereiro</h3>
          <div class="small-multiple iran"></div>

            <div class="paragraph">

              <p class="paragraph">A nação do Oriente Médio está entre as nações mais castigadas pela pandemia, com número de mortos menor apenas que China e Itália.</p>

              <p class="paragraph">Depois de anunciar, no final de fevereiro, que não imporia nenhuma quarentena, o governo anunciou medidas para conter a circulação de pessoas. Templos e locais de peregrinação foram fechados.</p>

              <p class="paragraph">A medida mais polêmica foi a libertação de cerca de 70 mil presos, por temor de alta contaminação e mortandade em presídios.</p>

            </div>
        
        
          <h2 class="small-multiple-title">Itália</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 24 de fevereiro</h3>
          <div class="small-multiple italy"></div>

            <div class="paragraph">

              <p class="paragraph">Segundo país que mais registrou casos da doença, depois da China, a Itália decretou quarentena nacional no dia 9 de março, expandindo uma medida anteriormente tomada apenas no norte do país.</p>

              <p class="paragraph">A região da Lombardia concentra a maioria dos casos e teve o sistema hospitalar sobrecarregado. O número de mortos registrados no país é o maior do mundo desde o dia 19 de março.</p>


            </div>

          <h2 class="small-multiple-title">Japão</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 22 de fevereiro</h3>
          <div class="small-multiple japan"></div>

            <div class="paragraph">

              <p class="paragraph">Desde o dia 28 de janeiro, o governo tem poderes para determinar que pessoas com suspeita de contaminação façam exame obrigatório e fiquem em isolamento. As autoridades também têm poder de ordenar hospitalizações e tratamentos.</p>
              
              <p class="paragraph">A grande dúvida é se o país manterá a realização dos Jogos Olímpicos, marcados para o final de julho.</p>

            </div>

          <h2 class="small-multiple-title">Reino Unido</h2>
          <h3 class="small-multiple-subtitle">Superou 100 casos no dia 6 de março</h3>
          <div class="small-multiple united-kingdom"></div>

            <div class="paragraph">

              <p class="paragraph">Depois de resistir à ideia, o governo britânico decidiu determinar o fechamento das escolas. Apenas alguns estabelecimentos permanecerão abertos para atender aos filhos de servidores públicos que seguirão trabalhando durante a crise, como policiais e pessoal da área médica.</p>

              <p class="paragraph">O plano inicial do primeiro-ministro Boris Johnson era o de adotar medidas paliativas e tentar empurrar o pico da pandemia para o verão. Um estudo de especialistas do Imperial College London, publicado no dia 16 de março, fez o governo mudar de ideia. O material indicou que haverá milhares de mortes a mais caso não sejam adotadas imediatamente medidas de supressão de mobilidade.</p>

            </div>

        </div>

    <footer>

      <div class="footer-wrapper">

          <div class="rodape">

            <div class="metodologia">

                <p class="footer-text">Os dados desta reportagem são compilados diariamente a partir de relatórios do Centro Europeu para Controle e Prevenção de Doenças (ECDC) pela organização <a href="https://ourworldindata.org/coronavirus-source-data" target="_blank" rel="noopener">Our World in Data</a>, ligada à Universidade de Oxford, na Inglaterra. Até a manhã de 20 de março, a reportagem mostrava dados de uma fonte diferente, compilados pela Organização Mundial de Saúde (OMS). O código fonte e a base de dados usados para gerar os gráficos estão disponíveis no <a href="https://github.com/estadao/monitor-da-pandemia" target="_blank" rel="noopener">GitHub do Estadão</a>.</p>

            </div>

            <div class="expediente">

              <h3 class="title-footer">Expediente</h3>

              <div class="expediente-container">
                <span class="expediente-cargo">Editor Executivo Multmídia:</span><span class="expediente-nome">Fábio Sales</span>
                <span class="expediente-cargo">Editora de Infografia Multimídia:</span><span class="expediente-nome">Regina Elisabeth Silva</span>
                <span class="expediente-cargo">Editor-assistente de Infografia Multimídia:</span><span class="expediente-nome">Carlos Marin</span>
                <span class="expediente-cargo">Design e desenvolvimento:</span><span class="expediente-nome">Rodrigo Menegat</span>

              </div>

        </div>

      </div>

    </footer>

    <!-- d3.js-->
    <script src="https://d3js.org/d3.v5.js"></script>

    <!-- d3 annotations -->
    <script src="https://rawgit.com/susielu/d3-annotation/master/d3-annotation.min.js"></script>

    <!-- chart -->
    <script src="viz/dual-comparison.js?v=0.0.4"></script>


  </body>
  <?php $core->include('body-closing') ?>

</html>