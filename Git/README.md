# Versionamento Git

* Para que precisamos versionar um código? De certa forma, mexer em um projeto pode ser assustador, pois podemos mexer em algo e danificar
  outras. Porque, dependendo da mudança fica dificil voltar ao estado anterior.
* Um versionador e o sistema que ira gerenciar as versoes do projeto;
* Uma solução para as mudança é o versionamento de codigo.;
* Com o GIT podemos escolher o arquivo que será comitado.



## Comando Git

```
$ git diff, mostra as alterações por linha

$ git config local --local user.name "igor"
$ git config local --local user.email "igor"

$ git stash | não comitou mas teve alteração, entao ele tira do fluxo e deixa arquivado

$ git init [cria um repositorio]

$ git clone git://endereco.git [cria um clone do diretorio informado para a maquina local, ir fazer o downlaod]

$ git status [irá demonstrar o que esta para ser alterado e etc]
	#Changes to be committed: [estarão os arquivos que serao comitados]
	#Changes not staged for commit: [estarão os arquivos que EXISTEM e COM ALTERAÇÃO]
	#Untracked files: [estarao ARQUIVOS NOVOS]
$ git add seunome.txt[irá adicionar o arquivo SEUNOME]
$ git commit -m [informa a mensagem para ser adicionada]
$ git commit -a -m [adiciona todos]
$ git push [ira adicionar ao GITHUB]
$ git log [ira exibir os commites feitos]
	$ git log --oneline
	$ git log --oneline -n 2 [ira exibir os 2 commits]
  [PARA SAIR DO GIT LOG PRESSIONE O BOTAO 'Q']

$ git clean -n [ira exibir oq sera excluido]
$ git clean -f [ira remover todos untracked]

PADRÃO PARA VOLTAR A UMA VERSÃO MAIS ANTIGA:
$ git log --oneline -n4
'ira gerar a lista de commits feito > selecione o commit desejado

$ git reset -hard b173970
'b173970 é o numero do commit

ou

$ git checkout -b sessao
```

## Branch

| Descrição                                | Código Git                     |
| ---------------------------------------- | ------------------------------ |
| Listar todas branchs (remotas ou locais) | `git branch -a`                |
| Remover branch                           | `git branch -d SuaBranch`      |
| Remover branch já comitada               | `git push -d origin SuaBranch` |
| Criar a branch e selecionar              | `git checkout -b SuaBranch`    |





### Merge da branch para Develop

```
git clone repositorioHttps;

git checkout develop
git checkout -b alteracao-no-readme-igor
--- desenvolve ---

git add .
git commit -m "detalhar o que foi feito"

--- opcional ---
git push --set-upstream origin srv-fico //irá subir a nova branch
----------------

git checkout develop
git pull
git merge alteracao-no-readme-igor //irá adicionar as atualizações para develop
git push
```



## Criando chave SSH

O comando abaixo irá criar uma chave SSH para ser inserida

```
ssh-keygen -t rsa -C m232436@bradesco.com.br
```



