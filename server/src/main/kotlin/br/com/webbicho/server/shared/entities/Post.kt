package br.com.webbicho.server.shared.entities

import jakarta.persistence.*
import java.util.*

@Entity(name = "posts")
class Post(
	@Column(columnDefinition = "TEXT", nullable = false)
	var content: String,
	
	// Implements files support
	
	@Column(name = "user_uuid", nullable = false)
	var userUuid: UUID,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "user_uuid",
		nullable = false,
		insertable = false,
		updatable = false,
	)
	private var user: User? = null,
	
	@OneToMany(
		mappedBy = "post",
		cascade = [CascadeType.REMOVE],
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	private val comments: MutableList<Comment> = mutableListOf()
) : WbEntity()
