package com.infosys.lostFoundApplication.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.FoundItemDTO;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.FoundItemRepository;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemRepository repository;

    // ✅ FIXED generateFoundItemId()
    public String generateFoundItemId() {

        String newId = "";

        
        List<String> ids = repository.findLastId();  

        if (ids == null || ids.isEmpty()) {
            newId = "F100001";
        } else {
            String lastId = ids.get(0); // first item (DESC order)
            int num = Integer.parseInt(lastId.substring(1)) + 1;
            newId = "F" + num;
        }

        return newId;
    }

    private List<FoundItem> keywordSearch(String keyword) {
        return repository.searchByKeyword(keyword);
    }

    // Fuzzy search using MySQL SOUNDEX (phonetic similarity)
    private List<FoundItem> soundexSearch(String keyword) {
        return repository.fuzzySearchBySoundex(keyword);
    }

    // Combined smart search (LIKE + SOUNDEX)
    private List<FoundItemDTO> smartSearch(String keyword) {

        List<FoundItem> keywordResults = repository.searchByKeyword(keyword);
        List<FoundItem> soundexResults = repository.fuzzySearchBySoundex(keyword);

        // Merge without duplicates
        Map<String, FoundItemDTO> merged = new LinkedHashMap<>();

        keywordResults.forEach(f ->
            merged.put(f.getFoundItemId(), new FoundItemDTO(f))
        );

        soundexResults.forEach(f ->
            merged.put(f.getFoundItemId(), new FoundItemDTO(f))
        );

        return new ArrayList<>(merged.values());
    }

    public List<FoundItemDTO> collectFoundItems(LostItem lostItem) {

        TreeSet<FoundItemDTO> itemSet = new TreeSet<>();

        itemSet.addAll(smartSearch(lostItem.getLostItemName()));
        itemSet.addAll(smartSearch(lostItem.getCategory()));
        itemSet.addAll(smartSearch(lostItem.getColor()));

        return new ArrayList<>(itemSet);
    }
}
