
// Add this to the onEdit() function

/** 
* Create a dynamic dropdown menu
* @param ({spreadsheet}) dataSheet     sheet with lists to populate dropdown
* @param ({range})       activeCell    range of the edited cell
* @param ({array})       sheetArray    If sheetsIn is true run on these sheets, otherwise don't
* @param ({Number})      headerEnds    index of last row the header is on
* @param ({Number})      colCheck      Column to check If edit made in this column the function runs
* @param ({Boolean})     sheetsIn      Should the sheetArray be inclusive or exclusive
*/
function createDynamicDropdown(dataSheet, activeCell, sheetArray, headerEnds, colCheck, sheetsIn ){

    // Get cell coordinates 
	var inCol = activeCell.getColumn();
	var inRow = activeCell.getRow();
	
	var proceed = true
	
	

	if(sheetsIn == true){
		proceed = sheetArray.indexOf(ss.getName()) != -1 ? true, false
	} else{
		proceed = sheetArray.indexOf(ss.getName()) == -1 ? true, false
	}
	
	if(
		inCol == colCheck && // Column to check
		inRow > headerEnds &&  // last header row
		proceed = true
	){
		// Clear the cell next to the activeCell
		activeCell.offset(0, 1).clearContent().clearDataValidations();
		
		// Get the range of lists from the data sheet
		var listRange = dataSheet.getRange(1, 1, 1,  dataSheet.getLastColumn()).getValues()

		// Clean op the array
		var rangeList = listRange[0]

		// Get the index of the list
	    var listIndex = rangeList.indexOf(activeCell.getValue()) + 1;

		// If the index is not missing create the dropdown
		if(rosterIndex != 0) {
			var validationRange = dataSheet.getRange(3, listIndex, dataSheet.getLastRow());
		    var validationRule = SpreadsheetApp.newDataValidation().requireValueInRange(validationRange).build();
		    activeCell.offset(0, 1).setDataValidation(validationRule);
			}
		}
	}
  
  }