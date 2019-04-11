import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    // if (!searchText) return items;
    if (searchText) {
      if (
        !searchText.searchString &&
        !searchText.startDate &&
        !searchText.endDate
      ) {
        return items;
      } else {
        if (searchText.searchString) {
          items = items.filter(it => {
            return it.to_firstname == searchText.searchString ||
              it.from_firstname == searchText.searchString
              ? it
              : null;
          });
        }

        if (searchText.startDate) {
          items = items.filter(it => {
            var ourDate = new Date(it.updatedAt);
            var searchDate = new Date(searchText.startDate);
            if (ourDate > searchDate) {
              return it;
            } else {
              return null;
            }
          });
        }

        if (searchText.endDate) {
          items = items.filter(it => {
            var ourDate = new Date(it.updatedAt);
            var searchDate = new Date(searchText.endDate);
            if (ourDate < searchDate) {
              return it;
            } else {
              return null;
            }
          });
        }

        return items;
      }
    }
  }
}

@Pipe({
  name: "userFilter"
})
export class FilterUsers implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.type) {
      return items;
    }
    items = items.filter(it => {
      return searchText.type == "merchant"
        ? it.is_merchant == 1
          ? searchText.activeInactiveStatus == "active"
            ? it.active_status == "1"
              ? it
              : null
            : it
          : null
        : searchText.type == "admin"
        ? it.is_admin == 1
          ? it
          : null
        : it.is_merchant == 0 && it.is_admin !== 1
        ? it
        : null;
    });
    return items;
  }
}

@Pipe({
  name: "empSearch"
})
export class FilterACHTransfer implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.name) return items;
    items.map(item => {
      return (item.role = item.role ? item.role : "");
    });
    searchText.name = searchText.name.toLowerCase();
    let item = items.filter(it => {
      return it.firstName.toLowerCase().includes(searchText.name) ||
        it.lastName.toLowerCase().includes(searchText.name) ||
        it.role.toLowerCase().includes(searchText.name)
        ? it
        : null;
    });
    return item;
  }
}

@Pipe({
  name: "giftFilter"
})
export class FilterGiftCard implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.dashboardGiftCard) {
      return items;
    }
    items = items.filter(it => {
      var currentDate = new Date(it.createdAt);
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      var firstDate = new Date(month + "-01-" + year);
      if (currentDate > firstDate) {
        return it;
      } else {
        return null;
      }
    });
    return items;
  }
}

@Pipe({
  name: "bucksFilter"
})
export class FilterBucksPurchased implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.dashboardPurchasedCredits) {
      return items;
    }
    items = items.filter(it => {
      console.log(it);
      var currentDate = new Date(it.createdAt);
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      var firstDate = new Date(month + "-01-" + year);
      if (currentDate > firstDate) {
        return it;
      } else {
        return null;
      }
    });
    return items;
  }
}

@Pipe({
  name: "convenienceFilter"
})
export class FilterConveniencePaid implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.dashboardGiftCard) {
      return items;
    }
    items = items.filter(it => {
      var currentDate = new Date(it.createdAt);
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      var firstDate = new Date(month + "-01-" + year);
      if (currentDate > firstDate) {
        return it;
      } else {
        return null;
      }
    });
    return items;
  }
}
