package com.infosys.lostFoundApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FoundItem {

    @Id
    private String foundItemId;
    private String foundItemName;
    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;
    private String foundDate;
    private boolean status;

    public FoundItem() {
        // Default constructor required by JPA
    }

    public FoundItem(String foundItemId, String foundItemName, String color, String brand, String category,
                     String location, String username, String foundDate) {
        this.foundItemId = foundItemId;
        this.foundItemName = foundItemName;
        this.color = color;
        this.brand = brand;
        this.category = category;
        this.location = location;
        this.username = username;
        this.foundDate = foundDate;
    }

    public String getFoundItemId() {
        return foundItemId;
    }

    public void setFoundItemId(String foundItemId) {
        this.foundItemId = foundItemId;
    }

    public String getFoundItemName() {
        return foundItemName;
    }

    public void setFoundItemName(String foundItemName) {
        this.foundItemName = foundItemName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFoundDate() {
        return foundDate;
    }

    public void setFoundDate(String foundDate) {
        this.foundDate = foundDate;
    }

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	
}
