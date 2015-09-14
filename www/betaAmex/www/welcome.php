
	<ul class="list-group">
		<h1>
			<span class='label label-primary'>Velkommen til AmexVenn !</span>
		</h1>
		<br>
		<div>
		 <?php

		 include "../betaAmex/db/connect.php";

		 echo ("<p class='lead'>Her kan du få en oversikt over hvilke butikker og nettsider som aksepterer American Express som betalingsmåte.</p>
		 	<h4>Vennligst velg en av kategoriene i menyen til venstre.</h4>
		 </div>

		 <div>
		 	<h3>Siste 5 lagt inn:</h3>");

		 $sql = "select link from haakonw.stores order by id desc limit 5";
		  $result = mysqli_query($db, $sql);
		  if(!$result)
		  	echo "Her gikk noe galt, vennligst prøv igjen.";
		 else
		  	while($data = mysqli_fetch_row($result)){
		  		echo utf8_encode("<li class='list-group-item'>$data[0]</li>");
		  	}
		 	?>
		</ul>

	</div>
