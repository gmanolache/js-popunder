Javascript Popunder
=====
This Javascript class help to easy make a popunder (avoid blocked by Google Chrome)
You can make multiple window/tab

- Note: The popunders will open all at the same time with Firefox, IE
But in Google Chrome, i have been try to avoid blocked by Chrome popunder-blocker therefore the popunders will be open in order clicked


<script type="text/javascript" src="popup.js"></script>
<script type="text/javascript">
Light.Popup.create('site1.com', {onNewTab: true});
Light.Popup.create('site1.com', {width: 100, height: 100, onNewTab: false});
Light.Popup.create('site3.com', {alwaysPop: true});
</script>