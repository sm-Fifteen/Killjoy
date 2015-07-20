class Filter {
    constructor (filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
        this.filterPattern = filterPattern;
        this.timeAllowed = timeAllowed;
        this.timeUpPolicy = timeUpPolicy;
        this.expirationPolicy = expirationPolicy;
    }
}

class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    engage() {
      var timeLeft = filter.timeAllowed - timeSpent
      //alarm create(filter.filterPattern, {delayInMinutes: timeLeft})
    }

    disengage() {
      //alarm get(filter.filterPattern)
      //alarm clear(filter.filterPattern)
      //timeSpent = (new Date.now() - alarm.scheduledTime)/(60 * 1000)
    }
    
}

class Blacklist {
    constructor (editingParameters, filterList, activeFilters) {
        if(typeof filterList !== "undefined") {
            this.refFilterList = filterList;
        } else {
            this.refFilterList = [];
        }

        if(typeof activeFilters !== "undefined") {
            this.activeFilterList = activeFilters;
        } else {
            this.activeFilterList = [];
        }
        // There was a Proxy here once, but it only served
        // to make things more complicated on both ends.
    }

    add(filter) {
      refFilterList.push(filter)
    }

    remove(soughtFilter) {
      var refIdx = refFilterList.find(filter => filter === soughtFilter);
      var activeIdx = activeFilterList.find(activeFilter => activeFilter.filter === soughtFilter);
      if (refIdx > -1) refFilterList.splice(refIdx, 1);
      if (activeIdx > -1) activeFilterList.splice(activeIdx, 1);
    }

    hasMatchesFor(url) {
      return refFilterList.filter(function(filter) {
        var regexString = filter.filterPattern.replace(/\*/g, '\.\*')
        regexString = regexString.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
        var regex = new RegExp(regexString, 'i')
        return regex.test(url)
      });
    }

    activateFilter(filter) {
      var afListIdx = activeFilterList.find(activeFilter => activeFilter.filter === filter)
      if (afListIdx > -1) afListIdx = activeFilterList.push(new ActiveFilter(filter)) - 1;
      activeFilterList[afListIdx].engage();
    }

    getFilterByPattern(filterPattern) {
       var filterIdx = refFilterList.find(filter => filter.filterPattern === filterPattern)
       return refFilterList[filterIdx]
    }

    disengageActiveFilters() {
      for (activeFilter of activeFilterList) activeFilter.disengage()
    }
}
