## Local DB

Una libreria molto utile per la gestione dei dati in locale, utilizzando solo il `localStorage` oppure il `sessionStorage`.
L'utilizzo è davvero molto semplice, vediamo come interagire con LocalDB :

### La definizione

Creando una nuova istanza si crea un nuovo DB o un riferimento ad uno esistente, il pivot è il nome :


```javascript

var db = new window.localdb( {} );

```

Si possono passare dei parametri che definiscono le opzioni di gestione del DB, questi i parametri di base, massima flessibilità di gestione :


```javascript

var db = new window.localdb( {

// --> Potrebbe anche essere sessionStorage

    storage: localStorage

// --> Il nome del database

        ,
    name: "MyDB"

// --> Errore generico

        ,
    onerror: function(number) {}

// --> Chiamata ogni volta che ci sono variazioni

        ,
    change: function(tablename, recordschanged, eventname, mytableobj) {}

// --> Incapsula un processo di cifratura

        ,
    encrypt: function(decrypted, mypass) {

        return decrypted;

    }

// --> Incapsula un processo di decifratura

        ,
    decrypt: function(encrypted, mypass) {

        return encrypted;

    }

} );

```

Il database espone alcune funzioni dopo essere istanziata :

```javascript

/* --> Aggiunge uno o più records nel database 
*  
*  tablename = Il nome della tabella con cui si vuole lavorare
*  records   = Un array di oggetti, sono i records della tabella
*  then      = Callback eseguita alla fine della procedura, vengono passati
*              2 parametri, il numero dell'eventuale errore e i records in esame
*  
*/

db.add( tablename, records, then );


/* --> Modifica uno o più records nel database 
*  
* Parametri identici al '.add'
*  
*/

db.update( tablename, records, then );


/* --> Rimuove uno o più records nel database 
*  
* Parametri identici al '.add' ad eccezzione del :
* ids = Array di numeri corrispondenti agli ID ( non indici ) dei records
*/

db.remove( tablename, ids, then );


/* --> Sposta uno record nel database nell'indice reale 
*  
* Parametri identici al '.add' ad eccezzione di :
* idfrom = Intero che identifica l'ID da spostare
* idto   = Intero che identifica l'ID da cui prendere il posto
*/

db.move( tablename, idfrom, idto, then );


/* --> Cambia di posto 2 record nell'indice reale
*  
* Parametri identici al '.move'
*  
*/

db.invert( tablename, idfrom, idto, then );


/* --> Effettua una ricerca nel DB
*  
*  tablename = Il nome della tabella con cui si vuole lavorare
*  condition = Callback per filtrare
*  opt       = {
*
*      offset    : 0
*
*      limit     : 0
*
*      sort      : "asc"
*
*      sensitive : false
*
*      sortby    : "Column Name"
*
*  }
*  
*/


db.query( tablename, condition, opt );


/* --> Cifra l'intero database se è stata incapsulata la funzione di cifratura
*  
* mypass = La password con cui cifrare
*  
*/

db.encryptdb( mypass );


/* --> Decifra l'intero database se è stata incapsulata la funzione di decifratura
*  
* mypass = La password con cui decifrare
*  
*/

db.decryptdb( mypass );


/* --> Restituisce il numero di records della tabella richiesta
*/

db.countRecords( tableName );


/* --> Restituisce il prossimo ID che verrà utilizzato per un nuovo record
*/

db.getNextID( tableName );

```


Nella cartella della release c'è un file 'test.html' dove è possibile provare la gestione di un database in locale oppure seguire un [video tutorial](http://www.youtube.com) per comprendere meglio come utilizzarlo.

Se conosci bene l'Inglese e/o altre lingue potresti tradurre questo testo e/o magari fare un video tutorial, grazie.
