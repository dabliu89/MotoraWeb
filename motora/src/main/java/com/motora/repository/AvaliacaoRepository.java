package com.motora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motora.entity.Aluno;
import com.motora.entity.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Aluno, Long> {

	List<Avaliacao> findByAluno(Aluno aluno);

	Avaliacao saveAll(Avaliacao avaliacao);}