// == Import de la lib React
import React from 'react';

// == Import npm

// == Imports locaux
import './style.scss';

const LegalInfos = () => (
  <div className="legal-infos">

    <h1 className="legal-infos-title">Mentions Légales</h1>

    <p className="legal-infos-description">
      Merci de lire avec attention les différentes modalités d’utilisation du présent site avant
      d’y parcourir ses pages.
      En vous connectant sur ce site, vous acceptez, sans réserves, les présentes modalités.
    </p>

    <p className="legal-infos-description">
      Aussi, conformément à l’article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance
      dans l’économie numérique, les responsables du présent site internet https://days-in-paris.netlify.app/ sont :
    </p>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Éditeur du Site :</h2>
      <p className="legal-infos-section-item">SARL DAYSINPARIS Numéro de SIRET : 75434802859302</p>
      <p className="legal-infos-section-item">Champ de Mars, 5 Av. Anatole France, 75007 Paris</p>
      <p className="legal-infos-section-item">Téléphone : 09 XX XX XX XX</p>
      <p className="legal-infos-section-item">Email : days-in-paris@gmail.fr</p>
      <p className="legal-infos-section-item">Site Web : https://days-in-paris.netlify.app/</p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Hébergement :</h2>
      <p className="legal-infos-section-item">Hébergeur : AWS</p>
      <p className="legal-infos-section-item">Support : https://aws.amazon.com/fr/contact-us/</p>
      <p className="legal-infos-section-item">Site Web : https://days-in-paris.netlify.app/</p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Développement :</h2>
      <p className="legal-infos-section-item">DAYS IN PARIS</p>
      <p className="legal-infos-section-item">Adresse : Champ de Mars, 5 Av. Anatole France, 75007 Paris</p>
      <p className="legal-infos-section-item">Site Web : https://days-in-paris.netlify.app/</p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Conditions d’utilisation :</h2>
      <p className="legal-infos-section-item">
        Ce site (https://days-in-paris.netlify.app/) est proposé en différents langages web
        (HTML, React, Javascript, CSS, etc…) pour un meilleur confort d’utilisation et un graphisme
        plus agréable.
      </p>
      <p className="legal-infos-section-item">
        Nous vous recommandons de recourir à des navigateurs modernes comme
        Safari, Firefox, Google Chrome, etc…
      </p>
      <p className="legal-infos-section-item">
        L’agence web DaysInParis met en œuvre tous les moyens dont elle dispose,
        pour assurer une information fiable et une mise à jour fiable de ses sites internet.
      </p>
      <p className="legal-infos-section-item">
        Toutefois, des erreurs ou omissions peuvent survenir. L’internaute devra donc s’assurer
        de l’exactitude des informations auprès de DaysInParis, et signaler toutes modifications
        du site qu’il jugerait utile. DaysInParis n’est en aucun cas responsable de l’utilisation
        faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.
      </p>
      <p className="legal-infos-section-item">
        Cookies : Le site https://days-in-paris.netlify.app/ peut-être amené à vous demander l’acceptation des
        cookies pour des besoins de statistiques et d’affichage. Un cookie est une information
        déposée sur votre disque dur par le serveur du site que vous visitez.
      </p>
      <p className="legal-infos-section-item">
        Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple
        fichier texte auquel un serveur accède pour lire et enregistrer des informations.
        Certaines parties de ce site ne peuvent être fonctionnelles sans l’acceptation de cookies.
      </p>
      <p className="legal-infos-section-item">
        Liens hypertextes : Les sites internet de peuvent offrir des liens vers d’autres sites
        internet ou d’autres ressources disponibles sur Internet. DaysInParis ne dispose
        d’aucun moyen pour contrôler les sites en connexion avec ses sites internet.
      </p>
      <p className="legal-infos-section-item">
        DaysInParis ne répond pas de la disponibilité de tels sites et sources externes,
        ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de
        quelque nature que ce soit, résultant du contenu de ces sites ou sources externes,
        et notamment des informations, produits ou services qu’ils proposent, ou de tout usage
        qui peut être fait de ces éléments. Les risques liés à cette utilisation incombent
        pleinement à l’internaute, qui doit se conformer à leurs conditions d’utilisation.
      </p>
      <p className="legal-infos-section-item">
        Les utilisateurs, les abonnés et les visiteurs des sites internet  ne peuvent
        pas mettre en place un hyperlien en direction de ce site sans l’autorisation
        expresse et préalable de DaysInParis.
      </p>
      <p className="legal-infos-section-item">
        Dans l’hypothèse où un utilisateur ou visiteur souhaiterait mettre en place un
        hyperlien en direction d’un des sites internet de DaysInParis, il lui
        appartiendra d’adresser un email accessible sur le site afin de formuler sa
        demande de mise en place d’un hyperlien.
        DaysInParis se réserve le droit d’accepter ou de refuser un hyperlien
        sans avoir à en justifier sa décision.
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Services Fournis</h2>
      <p className="legal-infos-section-item">
        L’ensemble des activités de la société ainsi que ses informations sont présentés
        sur notre site https://days-in-paris.netlify.app/.
      </p>
      <p className="legal-infos-section-item">
        DaysInParis s’efforce de fournir sur le site https://days-in-paris.netlify.app/ des informations
        aussi précises que possible. Les renseignements figurant sur le site https://days-in-paris.netlify.app/
        ne sont pas exhaustifs et les photos non contractuelles.
      </p>
      <p className="legal-infos-section-item">
        Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
        Par ailleurs, tous les informations indiquées sur le site https://days-in-paris.netlify.app/ sont données à
        titre indicatif,
        et sont susceptibles de changer ou d’évoluer sans préavis.
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Limitation contractuelles sur les données :</h2>
      <p className="legal-infos-section-item">
        Les informations contenues sur ce site sont aussi précises que possible et
        le site remis à jour à différentes périodes de l’année, mais peut toutefois
        contenir des inexactitudes ou des omissions.
      </p>
      <p className="legal-infos-section-item">
        Si vous constatez une lacune, erreur ou ce qui parait être
        un dysfonctionnement, merci de bien vouloir le signaler par
        courriel, à l’adresse contact@daysinparis.fr, en décrivant le
        problème de la manière la plus précise possible (page posant problème,
        type d’ordinateur et de navigateur utilisé, …).
      </p>
      <p className="legal-infos-section-item">
        Tout contenu téléchargé se fait aux risques et périls de l’utilisateur
        et sous sa seule responsabilité. En conséquence, ne saurait être tenu
        responsable d’un quelconque dommage subi par l’ordinateur de l’utilisateur
        ou d’une quelconque perte de données consécutives au téléchargement.
      </p>

      <p className="legal-infos-section-item">
        De plus, l’utilisateur du site s’engage à accéder au site en
        utilisant un matériel récent, ne contenant pas de virus et
        avec un navigateur de dernière génération mis-à-jour.
      </p>

      <p className="legal-infos-section-item">
        Les liens hypertextes mis en place dans le cadre du présent
        site internet en direction d’autres ressources présentes sur
        le réseau Internet ne sauraient engager la responsabilité de
        DaysInParis.
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Propriété intellectuelle :</h2>
      <p className="legal-infos-section-item">
        Tout le contenu du présent site https://days-in-paris.netlify.app/, incluant, de façon non limitative,
        les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi
        que leur mise en forme sont la propriété exclusive de la société à l’exception des marques,
        logos ou contenus appartenant à d’autres sociétés partenaires ou auteurs.
        (Photographie: Pexels.com, Logo: Khosheik, FavIcon: Smalllikeart)
      </p>

      <p className="legal-infos-section-item">
        Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
        même partielle, de ces différents éléments est strictement interdite sans l’accord exprès
        par écrit de DaysInParis. Cette représentation ou reproduction, par quelque procédé
        que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du
        Code de la propriété intellectuelle. Le non-respect de cette interdiction constitue une
        contrefaçon pouvant engager la responsabilité civile et pénale du contrefacteur.
        En outre, les propriétaires des Contenus copiés pourraient intenter une action
        en justice à votre encontre.
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Déclaration à la CNIL :</h2>
      <p className="legal-infos-section-item">
        Conformément à la loi 78-17 du 6 janvier 1978 (modifiée par la loi 2004-801
        du 6 août 2004 relative à la protection des personnes physiques à l’égard des
        traitements de données à caractère personnel) relative à l’informatique, aux
        fichiers et aux libertés, ce site a fait l’objet d’une déclaration 1656629 auprès
        de la Commission nationale de l’informatique et des libertés (www.cnil.fr).
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Litiges :</h2>
      <p className="legal-infos-section-item">
        Les présentes conditions du site https://days-in-paris.netlify.app/ sont régies par les lois
        françaises et toute contestation ou litiges qui pourraient naître de l’interprétation
        ou de l’exécution de celles-ci seront de la compétence exclusive des tribunaux dont
        dépend le siège social de la société. La langue de référence, pour le règlement de
        contentieux éventuels, est le français.
      </p>
    </div>

    <div className="legal-infos-section">
      <h2 className="legal-infos-section-title">Données personnelles :</h2>
      <p className="legal-infos-section-item">
        De manière générale, vous n’êtes pas tenu de nous communiquer vos données personnelles
        lorsque vous visitez notre site Internet https://days-in-paris.netlify.app/.
      </p>
      <p className="legal-infos-section-item">
        Cependant, ce principe comporte certaines exceptions. En effet, pour certains services
        proposés par notre site, vous pouvez être amenés à nous communiquer certaines données
        telles que : votre nom, prenom, et votre adresse électronique.
        Tel est le cas lorsque vous remplissez le formulaire qui vous
        est proposé en ligne, dans la rubrique « inscription ».
      </p>
      <p className="legal-infos-section-item">
        Dans tous les cas, vous pouvez refuser de fournir vos données personnelles.
        Dans ce cas, vous ne pourrez pas utiliser les services du site, notamment celui
        de solliciter des renseignements sur notre société, ou de recevoir les lettres
        d’information.
      </p>
      <p className="legal-infos-section-item">
        Enfin, nous pouvons collecter de manière automatique certaines informations
        vous concernant lors d’une simple navigation sur notre site internet, notamment :
        des informations concernant l’utilisation de notre site, comme les zones que vous
        visitez et les services auxquels vous accédez, votre adresse IP, le type de votre
        navigateur, vos temps d’accès.
      </p>
      <p className="legal-infos-section-item">
        De telles informations sont utilisées exclusivement à des fins de statistiques
        internes, de manière à améliorer la qualité des services qui vous sont proposés.
        Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998
        transposant
        la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.
      </p>
    </div>
  </div>
);

export default LegalInfos;
