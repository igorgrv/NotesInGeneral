# SQL Tips



## Encoding

```sql
-- Para lidar com encoding das tables POSTGRES
CREATE DATABASE fiap_postgres ENCODING 'UTF8';
```



## Table sizes (systables)

```sql
-- DB2
SELECT NAME AS TABLE_NAME, CARD AS NUMBER_ROWS 
FROM SYSIBM.SYSTABLES 
WHERE CREATOR = 'DATABASENAME'
ORDER BY CARD DESC;
```



## Indexes (syscat.indexes)

```sql
-- List indexes:
SELECT * FROM SYSCAT.INDEXES;
```



## JSON_VALUE

Quando um JSON é armazenado como String, podemos fazer o parse do json com **`JSON_VALUE(COLUMN, '$.Id')`**



Dado o JSON:

```json
{
  "Id":"123",
  "data": {
    "Id":"321"
  }
}
```

SQL:

```sql
SELECT 
	JSON_VALUE(PAYLOAD, '$.Id') as ID,
  JSON_VALUE(PAYLOAD, '$.data.Id') as Data_ID
```



## CREATE TABLE

Basic SQL:

* `SERIAL` = Auto incrementáveis (para o Postgres, cada banco pode ter um diferente)
* `VARCHAR(X)` = String = Grava no banco de forma dinâmica
  * Se passarmos **`VARCHAR(32)`** e passarmos `IGOR`, será **alocado 4 bytes**.
* `CHAR(X)` = String = Grava no banco sempre o tamanho de X
  * Se passarmos `CHAR(32)` e passarmos `IGOR`, será **alocado 32 bytes** (com espaços em branco).
  * Ideal para quando sabemos o tamanho;
* `FLOAT` = Número quebrado
* `INTEGER` = Número inteiro

```sql
CREATE TABLE clientes
(
	id SERIAL PRIMARY KEY,
  -- cpf CHAR(11) PRIMARY KEY,
  primeiro_nome VARCHAR(32) NOT NULL
)
```



## SETVAL

O `setval(primary_key, valor_inicial, boolean)` serve para **resetar o auto increment** de uma tabela

```sql
-- para postgres, irá retornar o nome do index da table 'clientes'
SELECT pg_get_serial_sequence('clientes', 'id');
```



setval:

```sql
-- irá resetar a table e começar com 1
-- parâmetro true faria começar com o 2
SELECT setval('clientes_id_seq', 1, false);
```



## FOREIGN KEY

O Banco relacional, se chama assim, por conta das `FOREIGN KEYs`!

* É o que faz acontecer o relacionamento entre diferentes tabelas!



Crie uma tabela `PEDIDOS` que contenha o ID dos `clientes` e `items`:

* `FOREIGN KEY` -> não será uma coluna, somente a refência a outra tabela;
* `ON DELETE CASCADE` -> informa, que se houver um `delete` de clientes, irá cascatear para os demais records

```sql
CREATE TABLE pedidos
(
	id INTEGER,
  id_cliente INTEGER NOT NULL,
  id_item INTEGER NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes (id) ON DELETE CASCADE,
  FOREIGN KEY (id_item) REFERENCES items (id) ON DELETE CASCADE
)
```







## Procedures

### Existing Procedures (sysprocedures)

```sql
SELECT PROCSCHEMA AS DATABASE, CREATE_TIME, s.SPECIFICNAME,PROCNAME AS PROCEDURENAME, TEXT AS PROCEDURE_CONTENT
FROM "SYSIBM".SYSPROCEDURES s
WHERE PROCSCHEMA = 'NHUB';
```



### Check privileges to run procedures

```sql
SELECT SUBSTR(AUTHID,1,10) as AUTHID, PRIVILEGE, SUBSTR(OBJECTNAME,1,30) as OBJECTNAME, SUBSTR(OBJECTSCHEMA,1,10) as OBJECTSCHEMA, SUBSTR(OBJECTTYPE,1,10) as OBJECTTYPE
FROM SYSIBMADM.PRIVILEGES
WHERE OBJECTSCHEMA = 'DATABASE_NAME' AND AUTHID = 'USER_ID' 
```



### Call procedures

```sql
CALL DATABASE_NAME.PROCEDURE_NAME('2023-03-13 00:00:00', 10, ?);
```



### db2 commands

Para rodar comandos pelo terminal

1. O usuário precisa ter um .bash_profile, com o código . ~db2inst1/sqllib/db2profile dentro
2. Se mudar o db2inst1 para 2 irá para INT (terá qe sair e entrar novamente



```sql
Connect to DB: connect to <dbname>
- Connect to NHUBINT | connect to NHUBDEV

Disconnect from DB: disconnect <dbname>

List all the DB2 instances on the current system:
$ db2ilist

List the current DB2 instance:
$ echo $DB2INSTANCE

Change the current DB2 instance (if required):
$export DB2INSTANCE=<instance>

Check database list in this instance:
$ db2 list db directory

```



### Common procedure

Create `script.sql` file with the content:

```sql
CREATE OR REPLACE PROCEDURE DATABASE_NAME.PROC(IN base_date VARCHAR(10), OUT records_count INTEGER)
LANGUAGE SQL
BEGIN
DECLARE cursor1 CURSOR FOR
SELECT COUNT(*) AS ROWS_COUNT FROM DATABASE_NAME.TABLE WHERE DATE(LOG_TIMESTAMP) < 'base_date';
OPEN cursor1;
FETCH FROM cursor1 INTO records_count;
CLOSE cursor1;
END@
```



### Register new procedure

```bash
db2 -td@ -svf DATABASE_NAME.TABLE
```

