# Javascript Smart Popunder Maker
* This class provides an easy way to make a popunder
* Avoid blocked on Google Chrome
* **Note**: _For Google Chrome, to avoid blocked so each popunder will be  fired by each click. You may increase `chromeDelay` option to pass Chrome Popup Blocker._

-----
* @author: Phan Thanh Cong <ptcong90@gmail.com>
* @license: MIT

**Donate author**
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G9ALZSSKUNX3G)


### Change logs
##### Version 2.4.4; May 20, 2015
 * Make popunder works on Mobile (tested with iOS)
 * Fix issue with multiple (newTab + blur) pops (Firefox 38+, Chrom

##### Version 2.4.3; May 19, 2015
 * Make popup (blur + newTab) works on Firefox 38+, Chrome 41+, IE 11

##### Version 2.4.2; May 18, 2015
 * Fix removing flash issue on Chrome.

##### Version 2.4.1; May 16, 2015
 * Fix forgot remove flash after popuped
 * Beauty some code

##### Version 2.4.0; May 15, 2015
 * Make popunder (blur + !newTab) **works on Chrome 41+, firefox with flash**, then must running with http://, not works with file://
 * Remove `smart`, `blurByAlert` options

##### Version 2.3.2; Apr 1, 2015
* Fix parse browser version in IE 11.

##### Version 2.3.1 - Mar 28, 2015
* Fix merge options in IE 7, fix some issues in IE 11.

##### Version 2.3 - Mar 23, 2015
* Add new options beforeOpen, afterOpen callback.

##### Version 2.2 - Mar 06, 2015
* update for google chrome 41.x (fire popunder ok, but can't blur now, i'm working on this)

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
    * `blur          : true`     // Blur popunder
    * ~~`blurByAlert   : false`    // For firefox, safari if open on newTab (will show an alert to force focus the current window)~~
    * `chromeDelay   : 500`       // **Increase the value if Chrome show popunder blocked message.**
    * ~~`smart         : false`    // for feature, if browsers block event click to window/body~~
    * `beforeOpen    : function(){}` // before open callback
    * `afterOpen     : function(){}` // after open callback

### Usage

    <script type="text/javascript" src="popup.js"></script>
    <script type="text/javascript">
    // make pop on new tab
    SmartPopunder.make('http://domain.com', {newTab: true});

    // make pop on new window with size 100x100
    SmartPopunder.make('http://domain.com', {width: 100, height: 100, newTab: false});

    // use cookie expires on 12 hours
    SmartPopunder.make('http://domain.com', {cookieExpires: 60 * 12});

    // @since 2.3
    SmartPopunder.make('http://example.com/newtab', {
      newTab: true,
      beforeOpen: function(pop) {
        console.log(pop);
        alert('before fired');
      },
      afterOpen: function(pop) {
        console.log(pop);
        alert('after fired');
      }
    });
    </script>

