# Javascript Smart Popunder Maker
* This class provides an easy way to make a popunder
* Avoid blocked on Google Chrome
* **Note**: _For Google Chrome, to avoid blocked so each popunder will be  fired by each click. You may increase `chromeDelay` option to pass Chrome Popup Blocker._

-----
* @author: Phan Thanh Cong <ptcong90@gmail.com>
* @release: Jan 11, 2015
* @version: 2.0
* @license: MIT

### Change logs
##### Version 2.1 - Jan 20, 2015
* Improved, fixed pop on tab/window always be focused. (still issues on firefox, safari if use newtab)
* New option `blurByAlert` (will show an alert message to focus the current tab - only for firefox, safari)

##### Version 2.0 - Jan 11, 2015
* Rewrite all the class.
* Add new SMART features to bypass Google Chrome Popup Blocker.

##### Version 1.2 - Jul 5, 2013
* Fixed bugs on IE 6,7,8
* Anti Google Chrome Blocker

##### Version 1.0 - 2011
* First release

### Usage
* By defaults, popunder flags will work on each browser session that mean if you restart the browser, the popup will fire again. Of course, you may change the behavior by `cookieExpires` (number of minutes or instance of Date).
* You have the general options with default values for popunder on new window:
    * `width      : window.screen.width`
    * `height     : window.screen.height`
    * `left       : 0`
    * `top        : 0`
    * `location   : 1`
    * `toolbar    : 1`
    * `status     : 1`
    * `menubar    : 1`
    * `scrollbars : 1`
    * `resizable  : 1`

* Options of Smart Popunder and default value:
    * `cookieExpires : null`     // in minutes
    * `cookiePath    : '/'`      // path for cookie
    * `newTab        : true`     // Make pop on new tab or new windows ?
    * `blur          : true`     // Blur popunder if use new windows, but may not works on Mac Os
    * `blurByAlert   : false`    // For firefox, safari if open on newTab (will show an alert to force focus the current window)
    * `chromeDelay   : 500`       // **Increase the value if Chrome show popunder blocked message.**
    * `smart         : false`    // for feature, if browsers block event click to window/body

### Usage

    <script type="text/javascript" src="popup.js"></script>
    <script type="text/javascript">
    // make pop on new tab
    SmartPopunder.make('http://domain.com', {newTab: true});

    // make pop on new window with size 100x100
    SmartPopunder.make('http://domain.com', {width: 100, height: 100, newTab: false});

    // use cookie expires on 12 hours
    SmartPopunder.make('http://domain.com', {cookieExpires: 60 * 12});
    </script>

