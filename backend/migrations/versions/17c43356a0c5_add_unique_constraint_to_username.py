"""add unique constraint to username

Revision ID: 17c43356a0c5
Revises: 070f96fac284
Create Date: 2024-11-21 21:27:14.674111

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17c43356a0c5'
down_revision = '070f96fac284'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('login', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('login', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
