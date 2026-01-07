package com.infosys.lostFoundApplication.dao;

import com.infosys.lostFoundApplication.bean.LostItem;
import java.util.List;

public interface LostItemDao {
	public void saveLostItem(LostItem lostItem);
	public List<LostItem> getAllLostItems();
	public LostItem getLostItemById(String lostItemId);
	public void deleteLostItemById(String lostItemId);
	public String getLastId();
	public List<LostItem> getLostItemsByUsername(String username);
}