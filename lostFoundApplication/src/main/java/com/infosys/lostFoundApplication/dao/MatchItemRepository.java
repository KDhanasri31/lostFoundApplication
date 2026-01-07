package com.infosys.lostFoundApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.lostFoundApplication.bean.*;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {

}
