## [LocalDB](https://leonardociaccio.github.io/LocalDB/)

Una libreria molto utile per la gestione dei dati in locale ( offline ), utilizzando solo il `localStorage` oppure il `sessionStorage`.
L'utilizzo è davvero molto semplice, con pochissime righe di codice si possono creare app molto performanti, l'integrazione con `Promise` che in questa versione viene proposta con una copia di [lie.js](https://github.com/calvinmetcalf/lie) lo rende ancora più intuitivo e pulito.

Creando una nuova istanza si crea un nuovo DB o un riferimento ad uno esistente, il pivot è il nome stesso.


```javascript

var db = new window.localdb( {

// --> Potrebbe anche essere sessionStorage

    storage: localStorage

	,
	
// --> Il nome del database

    name: "LocalDB"
	
	,

// --> Questa funzione viene chiamata ogni volta che ci sono variazioni

    change: function( tablename, recordschanged, eventname, mytableobj ) {}

} );

```

### LocalDB espone alcune funzioni, solo dopo essere stata istanziata 

I nomi delle funzioni e i parametri descrivono e rendono l'idea di cosa fanno, in perfetto stile `Promise`

```javascript


db.dev

db.name

db.password;

db.change( tablename, recordschanged, eventname, mytableobj );

db.add( tablename, records ).then( resolve( newrecords ), reject( reason ) );

db.update( tablename, records ).then( resolve( updated ), reject( reason ) );

db.remove( tablename, ids ).then( resolve( deleted ), reject( reason ) );

db.move( tablename, idfrom, idto ).then( resolve( moved ), reject( reason ) );

db.invert( tablename, idfrom, idto ).then( resolve( [ movedfrom, movedto ] ), reject( reason ) );

db.query( tablename, condition, opt ).then( resolve( filtered ), reject( reason ) );

db.encryptdb( mypass ).then( resolve, reject( reason ) );

db.decryptdb( mypass ).then( resolve, reject( reason ) );

db.getTable( tablename );

db.countRecords( tableName ).then( resolve( numrecords ), reject( reason ) );

db.export().then( resolve( JSON.stringify( alltable ) ), reject( reason ) );

db.import( alldb ).then( resolve, reject( reason ) );

db.clear( tablename ).then( resolve( self.name ), reject( reason ) );

db.isEncrypted().then( resolve( [ count, cripted ] ), reject( reason ) );


```

ed ecco un semplice esempio


```javascript

var negozio1 = new localdb( {

	name : "Il Mio Negozio 1"
	
	,
	
	change : function( tablename, recordschanged, eventname, mytableobj ){
	
		console.log( "DB 'Il Mio Negozio 1' [" + tablename + "] modificato !" );
	
	}

} );

var negozio2 = new localdb( {

	name : "Il Mio Negozio 2"
	
	,
	
	change : function( tablename, recordschanged, eventname, mytableobj ){
	
		console.log( "DB 'Il Mio Negozio 2' [" + tablename + "] modificato !" );
	
	}

} );

negozio1.password = "Password solo per 'Il Mio Negozio 1'";

// --> La colonna unique è riservata e deve essere univoca, comunque è opzionale

var clients1 = [

	{ nome : "Leonardo", cognome : "Ciaccio", unique : "leonardo.ciaccio@gmail.com" }

];

negozio1.add( "Clienti", clients1 ).then( function resolve( records ){

	console.log( "N1 : Sono stati aggiunti " + records.length + " records !" );

}, function reject( reason ){

	console.log( "N1 : Ci sono errori : " + reason );

} );

var clients2 = [

	{ nome : "Mario", cognome : "Ciaccio", unique : "" }

];

negozio2.add( "Clienti", clients2 ).then( function resolve( records ){

	console.log( "N2 : Sono stati aggiunti " + records.length + " records !" );

}, function reject( reason ){

	console.log( "N2 : Ci sono errori : " + reason );

} );

```

Dopo questa operazione il `localStorage` contiene i valori delle nostre tabelle di cui una cifrata, infatti se il valore di `.password` è diverso da `null` cifra l'intero DB, non deve mai essere `undefined`, ogni instanza ha la propria logica indipendente senza influenze tra di loro.

Nella cartella della release c'è un file `test.html` dove è possibile provare la gestione di un database in locale.

Se conosci bene l'Inglese e/o altre lingue potresti tradurre questo testo, grazie.
