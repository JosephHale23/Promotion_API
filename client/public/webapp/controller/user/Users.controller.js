sap.ui.define([
	"de/fpf/hcpcf/nodemongot01/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("de.fpf.hcpcf.nodemongot01.controller.user.Users", {
		onInit: function(){
			var oJSONModel = new JSONModel();
			this.getView().setModel(oJSONModel);
			this._loadUserData();
		},

		onAddUser: function(oEvent){
			this._getDialog().open();
			this._loadUserData();
		},

		onDeleteUser: function(oEvent){
			var that = this;

			var oContext = oEvent.getSource().getParent().getBindingContext();

			var id = oContext.getProperty("id");

			$.ajax({
    			url: "/api/promotions/" + id,
    			type: "DELETE"
			}).done(function(){
				MessageToast.show(that.getResourceBundle().getText("msgUserDeleted", [id]));
				that._loadUserData();
			}).fail(function(jqXHR, textStatus, error){
				MessageToast.show(that.getResourceBundle().getText("msgError"));				
			});
		},

		onCloseAddUserDialog: function(){
			this._getDialog().close();
			this._getDialog().destroy();
			delete this._oDialog;
		},

		onSaveAddUserDialog: function(){
			var that = this;

			var id = sap.ui.getCore().byId("ipID").getValue();
			var promotionCategory = sap.ui.getCore().byId("ipPromotionCategory").getValue();
			var promotionType = sap.ui.getCore().byId("ipPromotionType").getValue();
			var promotionDescription = sap.ui.getCore().byId("ipPromotionDescription").getValue();

			if(id === "" || promotionCategory === "" || promotionType === "" || promotionDescription === ""){
				MessageToast.show(that.getResourceBundle().getText("msgPleaseEnterAllValues"));
				return;
			}

			var userData = {
				"id": id,
				"promotion_category": promotionCategory,
				"promotion_type": promotionType,
				"promotion_description": promotionDescription
			};

			$.ajax({
    			url: "/api/promotions/",
    			type: "POST",
				contentType: "application/json", 
				data: JSON.stringify(userData)
			}).done(function(){
				MessageToast.show(that.getResourceBundle().getText("msgUserAdded", [id]));
				that._loadUserData();
			}).fail(function(jqXHR, textStatus, error){
				MessageToast.show(that.getResourceBundle().getText("msgError"));				
			});

			this.onCloseAddUserDialog();
		},

		onRefreshUser: function(){
			this._loadUserData();
		},

		_loadUserData: function(){
			this.getView().getModel().loadData("/api/promotions");
		},

		_getDialog : function () {
        	if (!this._oDialog) {
            	this._oDialog = sap.ui.xmlfragment("de.fpf.hcpcf.nodemongot01.view.user.UserCreate", this);
            	this.getView().addDependent(this._oDialog);
         	}
         	return this._oDialog;
      	}

	});
});