document.addEventListener("DOMContentLoaded", () => {
    interface Ecole {
        "Établissement": string;
        "Adresse": string;
        "Ville": string;
        "CodePostal": string;
        "Telephone": string;
        [key: string]: string;
    }

    let ecoles: Ecole[] = [];
    let donneesChargees = false;

    fetch("fr-esr-parcoursup.csv")
        .then(response => response.text())
        .then(text => {
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: (result: any) => {
                    ecoles = result.data;
                    donneesChargees = true;
                    console.log("Données chargées :", ecoles.map(e => e["Lien de la formation sur la plateforme Parcoursup"]));
                }
            });
        });

    (document.getElementById("searchButton") as HTMLButtonElement).addEventListener("click", rechercherEcole);

    function rechercherEcole() {
        if (!donneesChargees) {
            alert("Les données ne sont pas encore chargées, veuillez patienter.");
            return;
        }

        const searchInput = (document.getElementById("searchInput") as HTMLInputElement).value.trim();
        const encodedSearchInput = encodeURI(searchInput.toLowerCase());

        console.log("URL recherchée :", encodedSearchInput);

        const ecoleTrouvee = ecoles.find(ecole => {
            const url = ecole["Lien de la formation sur la plateforme Parcoursup"]?.trim().toLowerCase();
            return url && encodeURI(url) === encodedSearchInput;
        });

        const resultDiv = document.getElementById("result") as HTMLDivElement;
        resultDiv.innerHTML = ecoleTrouvee ? `<h2 class="subtitle">Informations générales</h2>
<p><strong>Session:</strong> ${ecoleTrouvee["Session"]}</p>
<p><strong>Statut de l’établissement:</strong> ${ecoleTrouvee["Statut de l’établissement de la filière de formation (public, privé…)"]}</p>
<p><strong>Code UAI:</strong> ${ecoleTrouvee["Code UAI de l'établissement"]}</p>
<p><strong>Établissement:</strong> ${ecoleTrouvee["Établissement"]}</p>
<p><strong>Code départemental :</strong> ${ecoleTrouvee["Code départemental de l’établissement"]}</p>
<p><strong>Département:</strong> ${ecoleTrouvee["Département de l’établissement"]}</p>
<p><strong>Région:</strong> ${ecoleTrouvee["Région de l’établissement"]}</p>
<p><strong>Académie:</strong> ${ecoleTrouvee["Académie de l’établissement"]}</p>
<p><strong>Commune:</strong> ${ecoleTrouvee["Commune de l’établissement"]}</p>
<p><strong>Coordonnées GPS :</strong> ${ecoleTrouvee["Coordonnées GPS de la formation"]}</p>

<h2 class="subtitle">Informations sur la formation</h2>
<p><strong>Filière de formation:</strong> ${ecoleTrouvee["Filière de formation"]}</p>
<p><strong>Sélectivité:</strong> ${ecoleTrouvee["Sélectivité"]}</p>
<p><strong>Filière très agrégée:</strong> ${ecoleTrouvee["Filière de formation très agrégée"]}</p>
<p><strong>Filière détaillée:</strong> ${ecoleTrouvee["Filière de formation détaillée"]}</p>
<p><strong>Filière détaillée bis:</strong> ${ecoleTrouvee["Filière de formation détaillée bis"]}</p>
<p><strong>Filière très détaillée:</strong> ${ecoleTrouvee["Filière de formation très détaillée"]}</p>

<h2 class="subtitle">Capacité et candidats</h2>
<p><strong>Capacité de l’établissement:</strong> ${ecoleTrouvee["Capacité de l’établissement par formation"]}</p>
<p><strong>Candidats totaux:</strong> ${ecoleTrouvee["Effectif total des candidats pour une formation"]}</p>
<p><strong>Candidates totales:</strong> ${ecoleTrouvee["Dont effectif des candidates pour une formation"]}</p>
<p><strong>Candidats en phase principale:</strong> ${ecoleTrouvee["Effectif total des candidats en phase principale"]}</p>
<p><strong>Candidats en phase complémentaire:</strong> ${ecoleTrouvee["Effectif total des candidats en phase complémentaire"]}</p>
<p><strong>Candidats en internat:</strong> ${ecoleTrouvee["Dont effectif des candidats ayant postulé en internat"]}</p>

<h2 class="subtitle">Classement et sélection</h2>
<p><strong>Rang du dernier appelé (Autres candidats):</strong> ${ecoleTrouvee["Rang du dernier appelé du groupe 1"]}</p>
<p><strong>Rang du dernier appelé (Bacheliers technologiques):</strong> ${ecoleTrouvee["Rang du dernier appelé du groupe 2"]}</p>
<p><strong>Rang du dernier appelé (Bacheliers professionnels):</strong> ${ecoleTrouvee["Rang du dernier appelé du groupe 3"]}</p>

<h2 class="subtitle">Statistiques sur les admis</h2>
<p><strong>% Admis ayant reçu une proposition à l’ouverture:</strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale"]}</p>
<p><strong>% Admis avant le bac:</strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission avant le baccalauréat"]}</p>
<p><strong>% Admis avant la fin de la procédure:</strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission avant la fin de la procédure principale"]}</p>
<p><strong>% Filles parmi les admis:</strong> ${ecoleTrouvee["% d’admis dont filles"]}</p>
<p><strong>% Admis néo bacheliers:</strong> ${ecoleTrouvee["% d’admis néo bacheliers"]}</p>
<p><strong>% Admis avec mention (BG):</strong> ${ecoleTrouvee["Dont % d’admis avec mention (BG)"]}</p>
<p><strong>% Admis avec mention (BT):</strong> ${ecoleTrouvee["Dont % d’admis avec mention (BT)"]}</p>
<p><strong>% Admis avec mention (BP):</strong> ${ecoleTrouvee["Dont % d’admis avec mention (BP)"]}</p>

<p><strong>% d’admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale :</strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale"]}</p>
<p><strong>% d’admis ayant reçu leur proposition d’admission avant le baccalauréat : </strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission avant le baccalauréat"]}</p>
<p><strong>% d’admis ayant reçu leur proposition d’admission avant la fin de la procédure principale :</strong> ${ecoleTrouvee["% d’admis ayant reçu leur proposition d’admission avant la fin de la procédure principale"]}</p>
<p><strong>% d’admis dont filles:</strong> ${ecoleTrouvee["% d’admis dont filles"]}</p>
<p><strong>% d’admis néo bacheliers issus de la même académie:</strong> ${ecoleTrouvee["% d’admis néo bacheliers issus de la même académie"]}</p>
<p><strong>% d’admis néo bacheliers issus du même établissement (BTS/CPGE) :</strong> ${ecoleTrouvee["% d’admis néo bacheliers issus du même établissement (BTS/CPGE) :"]}</p>
<p><strong>% d’admis néo bacheliers boursiers :</strong> ${ecoleTrouvee["% d’admis néo bacheliers boursiers"]}</p>
<p><strong>% d’admis néo bacheliers généraux :</strong> ${ecoleTrouvee["% d’admis néo bacheliers généraux"]}</p>

<p><strong>Effectif des admis néo bacheliers généraux:</strong> ${ecoleTrouvee["Effectif des admis néo bacheliers généraux"]}</p>
<p><strong>Effectif des admis néo bacheliers technologiques:</strong> ${ecoleTrouvee["Effectif des admis néo bacheliers technologiques"]}</p>
<p><strong>Effectif des admis néo bacheliers professionnels:</strong> ${ecoleTrouvee["Effectif des admis néo bacheliers professionnels"]}</p>

<h2 class="subtitle">Divers</h2>
<p><strong>Taux d’accès:</strong> ${ecoleTrouvee["Taux d’accès"]}</p>
<p><strong>Part des terminales générales en position d’admission:</strong> ${ecoleTrouvee["Part des terminales générales qui étaient en position de recevoir une proposition en phase principale"]}</p>
<p><strong>Part des terminales technologiques en position d’admission:</strong> ${ecoleTrouvee["Part des terminales technologiques qui étaient en position de recevoir une proposition en phase principale"]}</p>
<p><strong>Part des terminales professionnelles en position d’admission:</strong> ${ecoleTrouvee["Part des terminales professionnelles qui étaient en position de recevoir une proposition en phase principale"]}</p>
<p><strong>Lien Parcoursup:</strong> <a href="${ecoleTrouvee["Lien de la formation sur la plateforme Parcoursup"]}" target="_blank">Consulter sur Parcoursup</a></p>

<h2 class="subtitle">Informations supplémentaires</h2>
<p><strong>Code établissement paysage:</strong> ${ecoleTrouvee["etablissement_id_paysage"]}</p>
<p><strong>Composante établissement paysage:</strong> ${ecoleTrouvee["composante_id_paysage"]}</p>
<p><strong>Concours communs et banque d'épreuves:</strong> ${ecoleTrouvee["Concours communs et banque d'épreuves"]}</p>
<p><strong>List_com:</strong> ${ecoleTrouvee["list_com"]}</p>
<p><strong>Tri:</strong> ${ecoleTrouvee["tri"]}</p>
<p><strong>Code affiliation formation:</strong> ${ecoleTrouvee["cod_aff_form"]}</p>

<h2 class="subtitle">Groupes et répartition</h2>
<p><strong>Regroupement 1 effectué:</strong> ${ecoleTrouvee["Regroupement 1 effectué par les formations pour les classements"]}</p>
<p><strong>Regroupement 2 effectué:</strong> ${ecoleTrouvee["Regroupement 2 effectué par les formations pour les classements"]}</p>
<p><strong>Regroupement 3 effectué:</strong> ${ecoleTrouvee["Regroupement 3 effectué par les formations pour les classements"]}</p>

<p><strong>Effectif des candidats en terminale générale ayant reçu une proposition d’admission:</strong> ${ecoleTrouvee["Effectif des candidats en terminale générale ayant reçu une proposition d’admission de la part de l’établissement"]}</p>
<p><strong>Effectif des candidats en terminale technologique ayant reçu une proposition d’admission:</strong> ${ecoleTrouvee["Effectif des candidats en terminale technologique ayant reçu une proposition d’admission de la part de l’établissement"]}</p>
<p><strong>Effectif des candidats en terminale professionnelle ayant reçu une proposition d’admission:</strong> ${ecoleTrouvee["Effectif des candidats en terminale professionnelle ayant reçu une proposition d’admission de la part de l’établissement"]}</p>
<p><strong>Effectif des autres candidats ayant reçu une proposition d’admission:</strong> ${ecoleTrouvee["Effectif des autres candidats ayant reçu une proposition d’admission de la part de l’établissement"]}</p>` : "<p>Aucune école trouvée.</p>";
    }
});
