package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.infosys.lostFoundApplication.bean.FoundItem;

public interface FoundItemRepository extends JpaRepository<FoundItem, String> {

    
    @Query("""
        SELECT f.foundItemId
        FROM FoundItem f
        ORDER BY f.foundItemId DESC
        """)
    List<String> findLastId();

    // Get all found items for a particular username
    @Query("SELECT f FROM FoundItem f WHERE f.username = ?1")
    List<FoundItem> getFoundItemsByUsername(String username);

    // Keyword search (status is boolean)
    @Query(
      "SELECT f FROM FoundItem f " +
      "WHERE f.status = false AND (" +
      "LOWER(f.foundItemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(f.color)        LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(f.brand)        LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(f.location)     LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(f.category)     LIKE LOWER(CONCAT('%', :keyword, '%'))" +
      ")"
    )
    List<FoundItem> searchByKeyword(@Param("keyword") String keyword);

    // Native query for fuzzy search
    @Query(value = """
        SELECT * FROM found_item
        WHERE status = 0 AND (
            SOUNDEX(found_item_name) = SOUNDEX(:keyword) OR
            SOUNDEX(color)          = SOUNDEX(:keyword) OR
            SOUNDEX(brand)          = SOUNDEX(:keyword) OR
            SOUNDEX(location)       = SOUNDEX(:keyword) OR
            SOUNDEX(category)       = SOUNDEX(:keyword)
        )
        """, nativeQuery = true)
    List<FoundItem> fuzzySearchBySoundex(@Param("keyword") String keyword);
}
