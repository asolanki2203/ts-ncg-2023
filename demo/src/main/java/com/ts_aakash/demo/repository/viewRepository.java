package com.ts_aakash.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ts_aakash.demo.model.view;

public interface viewRepository extends JpaRepository<view,Integer> {
    
}
