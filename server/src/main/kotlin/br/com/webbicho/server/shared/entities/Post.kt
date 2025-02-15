package br.com.webbicho.server.shared.entities

import jakarta.persistence.*

@Entity(name = "posts")
class Post(
	@Column(columnDefinition = "TEXT", nullable = false)
	var content: String,
	
	@Column(columnDefinition = "TEXT", nullable = true)
	var file: String? = null,
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_uuid", nullable = false)
	var user: User,
	
	@OneToMany(
		mappedBy = "post",
		cascade = [CascadeType.ALL],
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	var comments: MutableList<Comment> = mutableListOf()
) : WbEntity()
