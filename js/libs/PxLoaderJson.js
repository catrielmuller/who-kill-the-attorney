function PxLoaderJson(name, tags, priority) {
  var self = this,
      loader = null,
      complete = false;
 
  self.tags = tags;
  self.priority = priority;
  self.data = null;
 
  self.start = function(pxLoader) {
    // we need the loader ref so we can notify upon completion
    loader = pxLoader;
 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", name, true);
    xhr.onreadystatechange = function() {
      if (xhr['readyState'] !== 4)  { return; }
      if (xhr['status'] !== 200) {
        loader.onError(self);
        return;
      }
      
      var serverResponse = xhr['responseText'];
      try {
        self.data = JSON.parse(serverResponse);
        loader.onLoad(self);
      } catch (e) {
        loader.onError(self);
      }
    }
    xhr.send(null);
  };
 
  // called by PxLoader to check status of image (fallback in case
  // the event listeners are not triggered).
  self.checkStatus = function() {
    if (complete) {
      loader.onLoad(self);
    }
  };
 
  // called by PxLoader when it is no longer waiting
  self.onTimeout = function() {
    if (complete) {
      loader.onLoad(self);
    } else {
      loader.onTimeout(self);
    }
  };
 
}
 
// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addJson = function(name, tags, priority) {
    var jsonLoader = new PxLoaderJson(name, tags, priority);
    this.add(jsonLoader);
 
    // return the img element to the caller
    return jsonLoader;
};