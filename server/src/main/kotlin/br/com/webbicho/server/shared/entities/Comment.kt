package br.com.webbicho.server.shared.entities

import jakarta.persistence.*
import org.hibernate.annotations.Check
import java.util.*

@Entity(name = "comments")
@Check(constraints = "COALESCE(post_uuid, parent_uuid) IS NOT NULL")
class Comment(
	@Column(columnDefinition = "TEXT", nullable = false)
	var content: String,
	
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
	
	@Column(name = "post_uuid", nullable = true)
	var postUuid: UUID? = null,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "post_uuid",
		nullable = true,
		updatable = false,
		insertable = false,
	)
	private var post: Post? = null,
	
	@Column(name = "parent_uuid", nullable = true)
	var parentUuid: UUID? = null,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "parent_uuid",
		nullable = true,
		updatable = false,
		insertable = false,
	)
	private var parent: Comment? = null,
	
	@OneToMany(
		mappedBy = "parent",
		cascade = [CascadeType.REMOVE],
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	private val children: MutableList<Comment> = mutableListOf()
) : WbEntity()
